//dependencies
const mongoose = require('mongoose');
const express = require('express'); 
const router = express.Router(); 

//Database schema for User
const salesSchema = new mongoose.Schema({
    prodname:String,
    itemcat: String,
    sku: String,
    tonn:Number, 
    unitprice:Number,
    amtpd:Number,
    ddbuyer:String,
    salesagent:String,
    sdate:String,
    refno:String,
    ddbranch: String,
    trans_type: String,
}, { timestamps: true });

// Associating the Schema with the actual collection name
module.exports = mongoose.model('Sale',salesSchema);