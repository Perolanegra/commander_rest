const mongoose = require('mongoose');

// A inserção dos usuários será realizada somente quando algum pedido for feito.
const TableSchema = new mongoose.Schema({
    id_users: { // ids dos usuários que estão na mesa.
        type: Array,
        default: null
    },
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
        maxlength: 300
    },
    name: {
        type: String,
        default: null
    },
});

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;