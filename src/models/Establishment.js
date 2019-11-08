const mongoose = require('mongoose');

const EstablishmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    distance: {
        type: String,
        default: null
    },
    duration: {
        type: String,
        default: null
    },
    lat: {
        type: Number,
        default: null
    },
    lng: {
        type: Number,
        default: null
    },
    rating: {
        type: String,
        required: true,
        default: null
    },
    img: {
        type: String,
        required: true,
        default: null
    },
    feedback: {
        type: String,
        default: ""
    },
    schedule: {
        type: String,
        required: true,
        default: null
    },
    address: {
        type: String,
        required: true,
        default: null
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

const Establishment = mongoose.model('Establishment', EstablishmentSchema);

module.exports = Establishment;