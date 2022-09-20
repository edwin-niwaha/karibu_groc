//dependencies
const mongoose = require('mongoose');
const express = require('express'); 
const { string } = require('joi');
const router = express.Router(); 

//Database schema for User
const purchSchema = new mongoose.Schema({
    prodname:String,
    ddprodtype:String, 
    sdate:String,
    tonn:Number,
    unitprice:Number,
    costprice:Number,
    supplier:String,
    dealer:String,
    ddbranch: String,
    contacttel:String,
    sellprice:Number,
    status:String,
    entertedby: String,
}, { timestamps: true });

// Associating the Schema with the actual collection name
module.exports = mongoose.model('Purchase',purchSchema);