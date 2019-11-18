const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: { // id_product, qtd_product
        type: Array,
        required: true
    },
    id_user: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date, 
        default: null
    },
    updated_at: {
        type: Date,
        default: null
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;