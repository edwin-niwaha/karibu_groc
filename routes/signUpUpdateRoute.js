//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isManager } = require("../auth/authorization");
const { isAdmin } = require("../auth/authorization");
const connectEnsureLogin = require("connect-ensure-login");

//Import signUpModel][poikj ]
const signUpModel = require('../models/signUpModel');
const branchModel = require('../models/branchModel');

//fetch users from db
router.get("/ulist", connectEnsureLogin.ensureLoggedIn(), isAdmin,
    async (req, res) => {
        try {
            let items = await signUpModel.find({ ddbranch: req.user.ddbranch });
            res.render("ulist", {
                Signups: items
            })
        }
        catch (err) {
            console.log(err)
            res.send("Could not retrieve the list")
        }
    })

//fetch selected user for update
router.get("/updateUsers/:id", connectEnsureLogin.ensureLoggedIn(), isAdmin,
    async (req, res) => {
        try {
            const brName = await branchModel.find()//to branches
            const roles = await signUpModel.find()
            const updateUser = await signUpModel.findById({ _id: req.params.id })
            res.render("UserUpdate", {
                Signup: updateUser,
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
                branchN: brName,
                roleAll: roles
            })

        } catch (error) {
            res.status(400).send('Cannot find user');
        }
    })

//save updated item
router.post("/updateUsers", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await signUpModel.findByIdAndUpdate({ _id: req.query.id }, req.body)
            res.redirect("/ulist")
        } catch (error) {
            res.status(400).send('Error Updating the record');

        }
    })

//delete records
router.post("/ulist", connectEnsureLogin.ensureLoggedIn(),isAdmin,
    async (req, res) => {
        try {
            await signUpModel.deleteOne({ _id: req.body._id })

            res.redirect("/ulist")
        }
        catch (err) {
            res.status(400).send("Unable to delete record")
        }
    })
module.exports = router