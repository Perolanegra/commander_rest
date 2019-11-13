const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id_profile: { // 1 - administrador , 0 - cliente
        type: String,
        enum: ["1", "0"],
        default: "0"
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