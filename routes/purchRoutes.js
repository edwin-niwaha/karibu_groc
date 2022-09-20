//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");
const { isManager } = require("../auth/authorization");
const { isAdmin } = require("../auth/authorization");
//Import User model
const purchModel = require('../models/purchModel');
const itemsModel = require('../models/itemsModel');
const branchModel = require('../models/branchModel');

//Display add purchases page
    router.get("/add_purch", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
    async (req, res) => {
        try {
            console.log(req.user)
            const brName = await branchModel.find()//to branches
            const produceList = await itemsModel.find()//to fetch items
            res.render("add_purch", {
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
                branchN: brName,
                produce: produceList
            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops! Access Denied, login to continue")
        }
    })

//save new purchase into the database
router.post("/newPurch", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            const newPurch = new purchModel(req.body)
            await newPurch.save()
            res.redirect("/add_purch")
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Oops!, Something went wrong.');
            //render -- pointing to a file
            //redirect -- to a path
        }
    })

//fetch purchases from the database //
router.get("/purch_list", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
    async (req, res) => {
        try {
            let items = await purchModel.find();
            let totalPurchase = await purchModel.aggregate([
                {
                    "$group": {
                        _id:"$all",
                        totalExpense: {$sum:"$costprice"},
                        totalPurchTonnage: {$sum:"$tonn"},
                        totalUnit: {$sum:"$unitprice"},
                        totalSellPrice: {$sum:"$sellprice"},
                    }
                }
            ])
            res.render("purchasesList", {
                purchases: items,
                totalPurchase: totalPurchase[0]

            })
        }
        catch (err) {
            console.log(err)
            res.send("Could not retrieve purchases")
        }
    })


//update selected purchase 
router.get("/purchaseUpdate/:id", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
    async (req, res) => {
        try {
            const brName = await branchModel.find()//to branches
            const produceList = await itemsModel.find()//to fetch items
            const updatePurchase = await purchModel.findById({ _id: req.params.id })
            res.render("purchEdit", { purchase: updatePurchase,
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
                branchN: brName,
                produce: produceList
             })

        } catch (error) {
            res.status(400).send('Cannot find item');
        }
    })

//save updated purchase item
router.post("/purchaseUpdate", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await purchModel.findByIdAndUpdate({ _id: req.query.id }, req.body)
            res.redirect("/purch_list")
        } catch (error) {
            res.status(400).send('Error Updating the Item');

        }
    })

//delete record from the database
router.post("/purch_list", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await purchModel.deleteOne({ _id: req.body._id })

            res.redirect("/purch_list")
        }
        catch (err) {
            res.status(400).send("Unable to delete record")
        }
    })
//Export module
module.exports = router;