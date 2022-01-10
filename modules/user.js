const mongoose = require('mongoose');
const db = require('../src/db');

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
})

const userDB = mongoose.connect(db.mongodb.collectionName, userSchema)

module.exports = { userSchema, userDB }