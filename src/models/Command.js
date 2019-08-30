const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
    id_orders: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"
    },
    id_visit: {
        type: String,
        required: true,
        unique: true
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

const Command = mongoose.model('Command', CommandSchema);

module.exports = Command;