const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    block: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D']
    },

    flatNo: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);