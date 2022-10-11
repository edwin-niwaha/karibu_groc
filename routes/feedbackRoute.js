//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");
const session = require('express-session');
const flash = require('connect-flash');
const {isManager} = require("../auth/authorization");
const {isAdmin} = require("../auth/authorization");

//Import User model
const contactModel = require('../models/contactModel');

router.get("/feedback", connectEnsureLogin.ensureLoggedIn(),isManager,
    async (req, res) => {
        try {
            let items = await contactModel.find();
            res.render("feedback", {
                Contacts: items
            })
        }
        catch (err) {
            console.log(err)
            res.send("Could not retrieve feeback")
        }
    })

//delete route
router.post("/feedback", connectEnsureLogin.ensureLoggedIn(), isAdmin,
    async (req, res) => {
        try {
            await contactModel.deleteOne({ _id: req.body._id })

            res.redirect("/feedback")
        }
        catch (err) {
            res.status(400).send("Unable to delete item")
        }
    })
//Export module
module.exports = router;