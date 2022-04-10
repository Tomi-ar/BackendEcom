const { Schema, model } = require('mongoose');
const MongoClient = require('../../config/mongoDB')
const mongoConnect = new MongoClient().connect()

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
    },
    names: {
        type: String,
        required: true,
        allowNull: false
    },
    age: {
        type: Number,
        required: true,
        allowNull: false
    },
    address: {
        type: String,
        required: true,
        allowNull: false
    },
    tel: {
        type: Number,
        required: true,
        allowNull: false
    },
    avatar: {
        data: Buffer,
        contentType: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    cart: {
        type: Array,
        "default": []
    }
}, {timestamps: true});

module.exports = model("usuarios", userSchema);