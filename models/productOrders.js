//dependencies
const mongoose = require('mongoose');
const express = require('express');
const { string } = require('joi');
const router = express.Router();

//Database schema for User
const stockSchema = new mongoose.Schema({
    prodId: String,
    prodname: String,
    itemcat: String,
    sku: String,
    tonn: Number,
    amtpd: number,
    isCredit: {
        type: boolean,
        enum: ['1', '0']
    }
},
    { timestamps: true, collection: 'productOrders' });

// Associating the Schema with the actual collection name
module.exports = mongoose.model('productOrders', stockSchema);