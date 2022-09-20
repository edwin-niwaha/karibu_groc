const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const passportLocalMongoose = require("passport-local-mongoose");

const signupSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'First Name can not be empty',
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: 'Email can not be empty',
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['director', 'manager', 'agent', 'inactive']
    },
    ddbranch: {
        type: String,
        required: true,
        trim: true,
        enum: ['Kabale', 'Kampala']
    },
    isAdmin: {
        type: String,
    },
    isActive: {
        type: String,
    },
    token: {
        type: String,
    },
    // created_at:{
    //     type:String,
    //     default:Date.now()
    // },
},{ timestamps: true });

signupSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("Signup", signupSchema);
