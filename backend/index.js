const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const protect = require('./middleware/authMiddleware');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());



app.use('/api/users', userRoutes);
app.get('/profile', protect, (req, res) => {

    res.json({
        msg: 'Protected Route Accessed',
        user: req.user
    });

});


dotenv.config();

connectDB();



app.get('/', (req, res) => {
    res.send('Community Store Backend Running');
});

app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.port}`);
});