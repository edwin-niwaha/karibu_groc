//dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Database schema for User
const itemsSchema = new mongoose.Schema({
    itemId: String,
    itemName: String,
    itemcat: String,
    sku: String,
    sdate: String,
    costprice: Number,
    sellprice: Number,
    supplier: String,
    openingStock: String,
    pic: String,
}, { timestamps: true }
);

// Associating the Schema with the actual collection name
module.exports = mongoose.model('tb_Item', itemsSchema);