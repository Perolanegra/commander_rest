const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;