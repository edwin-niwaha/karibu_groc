//dependencies
const mongoose = require('mongoose');
const express = require('express'); 
const router = express.Router(); 

//Database schema for User
const imageSchema = new mongoose.Schema({
    image:String
});

// Associating the Schema with the actual collection name
module.exports = mongoose.model('tbImage',imageSchema);