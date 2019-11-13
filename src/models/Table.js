const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    id_establishment: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        maxlength: 300,
        default: null
    },
    deleted_at: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
});

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;