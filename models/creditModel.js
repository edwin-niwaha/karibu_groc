//dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Database schema
const creditSchema = new mongoose.Schema({
    ddbuyer: String,
    nin: String,
    loc: String,
    contacttel: String,
    amtpd: Number,
    salesagent: String,
    prodname: String,
    ddproduce: String,
    tonn: Number,
    unitprice: Number,
    ddbranch: String,
    duedte: String,
    dpatchdate: String,
    trans_type: String,
}, { timestamps: true });

// Associating the Schema with the actual collection name
module.exports = mongoose.model('CreditSale', creditSchema);