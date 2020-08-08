const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 55,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    name: {
        type: String,
        required: true,
        max: 255,
        min: 4,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    passwordUpdateAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', User);
