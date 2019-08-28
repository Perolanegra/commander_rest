const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});