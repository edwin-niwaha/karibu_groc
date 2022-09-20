//dependencies
const mongoose = require('mongoose');
const express = require('express'); 
const router = express.Router(); 

//Database schema for User
const itemsSchema = new mongoose.Schema({
    itemName:String,
    ddprodtype:String,
    sku:String, 
    sdate:String,
    costprice:Number,
    sellprice:Number,
    profit_loss:Number,
    ddbranch: String,
    status:String
}, { timestamps: true }
);

// Associating the Schema with the actual collection name
module.exports = mongoose.model('tb_Item',itemsSchema);