const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Either admin or user
        default: ''
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

}, {timestamps : true});

module.exports = mongoose.model('User', userSchema);
