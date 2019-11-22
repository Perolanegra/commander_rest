const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
    id_orders: {
        type: Array,
        required: true
    },
    id_visit: {
        type: String,
        required: true,
        unique: true
    },
    id_establishment: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["paid", "open"],
        default: "open"
    },
    created_at: { // parametro pra saber se a comanda está ativa.
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

const Command = mongoose.model('Command', CommandSchema);

module.exports = Command;