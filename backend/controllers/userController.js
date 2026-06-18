const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const register = async (req, res) => {
    try {
        const { name, email, password, block, flatNo } = req.body;

        // Check required fields
        if (!name || !email || !password || !block || !flatNo) {
            return res.status(400).json({
                msg: 'All fields are required'
            });
        }

        // Check duplicate email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: 'Email already registered'
            });
        }

        // Validate block
        const validBlocks = ['A', 'B', 'C', 'D'];

        if (!validBlocks.includes(block)) {
            return res.status(400).json({
                msg: 'Invalid block'
            });
        }

        // Validate flat number
        const floor = Math.floor(flatNo / 100);
        const room = flatNo % 100;

        if (
            floor < 1 ||
            floor > 5 ||
            room < 1 ||
            room > 10
        ) {
            return res.status(400).json({
                msg: 'Invalid flat number'
            });
        }

        // Check room capacity
        const roomCount = await User.countDocuments({
            block,
            flatNo
        });

        if (roomCount >= 3) {
            return res.status(400).json({
                msg: 'Flat already has 3 users'
            });
        }
       
         // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        await User.create({
            name,
            email,
            password: hashedPassword,
            block,
            flatNo
        });

        try {

    await sendEmail(
        email,
        'Welcome to Community Store',
        `Hello ${name},

Your account has been successfully created.

Block: ${block}
Flat Number: ${flatNo}

You can now login and start shopping.

Regards,
Community Store Team`
    );

} catch (emailError) {

    console.log('Email Error:', emailError.message);

}
        // Success response
        return res.status(201).json({
            msg: 'User Registered Successfully',
        });

    } catch (error) {

        return res.status(500).json({
            msg: error.message
        });

    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid Email or Password'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                msg: 'Invalid Email or Password'
            });
        }
        const token = jwt.sign( {
            id: user._id,
            role: user.role
        },
            process.env.JWT_SECRET,{
            expiresIn: '7d'
        });
        
    return res.status(200).json({
            msg: 'Login Successful',
            token
    });

    } catch (error) {

        return res.status(500).json({
            msg: error.message
        });

    }
};


module.exports = { register, login};
