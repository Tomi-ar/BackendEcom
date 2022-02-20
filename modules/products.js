const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        allowNull: false
    },
    price: {
        type: Number,
        required: true,
    },
    items: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

module.exports = model("productos", productSchema);
