//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");
const session = require('express-session');
const flash = require('connect-flash');
const { isManager } = require("../auth/authorization");
const { isAdmin } = require("../auth/authorization");

//Import User model
const branchModel = require('../models/branchModel');

//Display branches page
router.get("/branches", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
    async (req, res) => {
        try {
            console.log(req.user)
            res.render("branches", {
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role
            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops! Access Denied, login to continue")
        }
    })

//save items into the database
router.post("/newBranch", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            const newBranch = new branchModel(req.body)
            await newBranch.save()
            res.redirect("/branches")
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Oops!, Something went wrong.');
        }
    })

//fetch items from db
router.get("/branch_list", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
    async (req, res) => {
        try {
            let items = await branchModel.find();
            res.render("branch_list", {
                branches: items
            })
        }
        catch (err) {
            console.log(err)
            res.send("Could not retrieve items")
        }
    })

//fetch selected item for update
router.get("/UpdateBranches/:id", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            const updatebranch = await branchModel.findById({ _id: req.params.id })
            res.render("branchUpdate", { Branch: updatebranch,
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
             })

        } catch (error) {
            res.status(400).send('Cannot find branch');
        }
    })

//save updated item
router.post("/UpdateBranches", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await branchModel.findByIdAndUpdate({ _id: req.query.id }, req.body)
            res.redirect("/branch_list")
        } catch (error) {
            res.status(400).send('Error Updating the record');

        }
    })

//delete records
router.post("/branch_list", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await branchModel.deleteOne({ _id: req.body._id })

            res.redirect("/branch_list")
        }
        catch (err) {
            res.status(400).send("Unable to delete record from the db")
        }
    })

//Export module
module.exports = router;