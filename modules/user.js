const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        allowNull: false
    },
    password: {
        type: String,
        required: true,
        allowNull: false
    }
}, {timestamps: true});

module.exports = { userSchema }