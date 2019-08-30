const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: null,
        maxlength: 450
    },
    img: {
        type: String,
        default: null
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;