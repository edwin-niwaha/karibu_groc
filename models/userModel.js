//dependencies
const mongoose = require('mongoose');
const express = require('express'); 
const router = express.Router(); 

//Database schema for User
const userSchema = new mongoose.Schema({
    username:String,
    email:String, 
    password:String,
    token:String,
    isAdmin:String,
    isActive:String
});

// Associating the Schema with the actual collection name
module.exports = mongoose.model('User',userSchema);