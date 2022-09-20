//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');

//Import userModel
const userModel = require('../models/userModel');

//Render index page
router.get('/index', (req, res) => {
    res.render('index');
});
router.get('/login', (req, res) => {
    res.render('login');
});

//save user details into the db
router.post("/newUser", async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
       res.redirect("/register")
    }
    catch (err) {
        console.log(err);
        res.status(400).send('Oops!, Something went wrong.');
        //render -- pointing to a file
        //redirect -- to a path
    }
})

//Export module
module.exports = router;