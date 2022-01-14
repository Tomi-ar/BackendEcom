const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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

module.exports = model("User", userSchema);
