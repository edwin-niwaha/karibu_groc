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
const itemsModel = require('../models/itemsModel');

//Display Items page
router.get("/add_item", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
    async (req, res) => {
        try {
            console.log(req.user)
            res.render("add_item", {
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role
            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops!, Something went wrong.")
        }
    })

//save items into the database
router.post("/newItem", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            const newItem = new itemsModel(req.body)
            await newItem.save()
            res.redirect("/add_item")
            // req.flash('message', 'Success!!');
            // res.send(req.flash('message'));
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Oops!, Something went wrong.');
        }
    })

//fetch items from db
router.get("/items_list", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
    async (req, res) => {
        try {
            let items = await itemsModel.find();
            let totalItems = await itemsModel.aggregate([
                {
                    "$group": {
                        _id:"$all",
                        totalCostPrice: {$sum:"$costprice"},
                        totalSellPrice: {$sum:"$sellprice"},
                        totalProfit: {$sum:"$profit_loss"},

                    }
                }
            ])
            res.render("items_list", {
                tb_Items: items,
                totalItems: totalItems[0]
            })
        }
        catch (err) {
            console.log(err)
            res.send("Could not retrieve items")
        }
    })

//fetch selected item for update
router.get("/UpdateItems/:id", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            const updateItem = await itemsModel.findById({ _id: req.params.id })
            res.render("itemsUpdate", { tb_Item: updateItem,
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role
             })

        } catch (error) {
            res.status(400).send('Cannot find item');
        }
    })

//save updated item
router.post("/UpdateItems", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await itemsModel.findByIdAndUpdate({ _id: req.query.id }, req.body)
            res.redirect("/items_list")
        } catch (error) {
            res.status(400).send('Error Updating the Item');

        }
    })

//delete records
router.post("/items_list", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await itemsModel.deleteOne({ _id: req.body._id })

            res.redirect("/items_list")
        }
        catch (err) {
            res.status(400).send("Unable to delete item from the db")
        }
    })

//Export module
module.exports = router;