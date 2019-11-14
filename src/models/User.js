const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: null
    },
    birthDate: {
        type: Date,
        default: null
    },
    statusMsg: {
        type: String,
        default: null
    },
    id_profile: { // 1 - administrador , 0 - cliente
        type: String,
        enum: ["1", "0"],
        default: "0"
    },
    img: {
        type: String,
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

const User = mongoose.model('User', UserSchema);

module.exports = User;