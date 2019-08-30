const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    place_name: {
        type: String,
        required: true
    },
    id_items: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "confirmed", "done"],
        default: "open"
    },
    id_table: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        default: 0
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