//dependencies
const mongoose = require('mongoose');
const express = require('express');
const { string } = require('joi');
const router = express.Router();

//Database schema for User
const stockSchema = new mongoose.Schema({
    itemName: String,
    quantity: Number,
}, {timestamps: true, collection: 'stock_avail'});

// Associating the Schema with the actual collection name
module.exports = mongoose.model('stock_avail', stockSchema);