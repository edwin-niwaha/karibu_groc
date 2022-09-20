//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");
const session = require('express-session');
const flash = require('connect-flash');

//Import User model
const contactModel = require('../models/contactModel');

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
  });

//save user details into the db
router.post("/newContact",
    async (req, res) => {
        try {
            const newContact = new contactModel(req.body)
            await newContact.save()
            //res.redirect("/contact")
            res.send('Feedback sent successfully! <a href="http://localhost:8080/contact"> Submit more feedback </a>')


        }
        catch (err) {
            console.log(err);
            res.status(400).send('Oops!, Something went wrong.');
        }
    })

//Export module
module.exports = router;