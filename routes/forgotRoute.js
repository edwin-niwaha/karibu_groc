//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');

//Import User model
const userModel = require('../models/userModel');

router.get("/forgot-password", (req, res) => {
    res.render("forgot-password")
})

//sednd email to the user

//Export module
module.exports = router;