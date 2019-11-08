const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
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
    },
    id_establishment: {
        type: String,
        required: true
    },
    establishment: {
        type: String,
        required: false
    },
    qtd: {
        type: Number,
        default: 0
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;