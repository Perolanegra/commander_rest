const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    id_place: {
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
    name: {
        type: String,
        default: null
    },
});

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;