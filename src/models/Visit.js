const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    id_users: {
        type: Array,
        required: true
    },
    id_table: {
        type: String,
        required: true
    },
    id_establishment: {
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
    finished_at: {
        type: Date,
        default: null
    },
    updated_at: {
        type: Date,
        default: null
    }
});

const Visit = mongoose.model('Visit', VisitSchema);

module.exports = Visit;