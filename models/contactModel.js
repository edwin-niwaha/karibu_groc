//dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Database schema for User
const contactSchema = new mongoose.Schema({
    feed_back: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    // created_at:{
    //     type:String,
    //     default:Date.now()
    // },
    status: String
}, { timestamps: true });//this replaces created_at: and updated_at fields

// Associating the Schema with the actual collection name
module.exports = mongoose.model('Contact', contactSchema);