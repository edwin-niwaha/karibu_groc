//dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Database schema for User
const branchSchema = new mongoose.Schema({
    branchName: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    status: String
}, { collection: 'branches' });

// Associating the Schema with the actual collection name
module.exports = mongoose.model('branches', branchSchema);