
//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");
const flash = require('connect-flash');
const { isManagerOrSalesAgent, isManager } = require("../auth/authorization");
const { isAdmin } = require("../auth/authorization");
//Import User model
const salesModel = require('../models/salesModel');
const creditModel = require('../models/creditModel');
const purchModel = require('../models/purchModel');
const itemsModel = require('../models/itemsModel');

//Display Sales page
router.get("/creditSales", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent, isAdmin,
    async (req, res) => {
        try {
            // console.log(req.user)
            const produceList = await purchModel.find({ddbranch: req.user.ddbranch})//to fetch items
            let totalSales = await salesModel.aggregate([
                {"$match":{ddbranch: req.user.ddbranch}},
                {
                    "$group": {
                        _id: "$all",
                        totalAmt: { $sum: "$amtpd" },
                        totalSoldTonnage: { $sum: "$tonn" },
                        totalUnit: { $sum: "$unitprice" },
                    }
                }
            ])
            //aggregate credit sales
            let totalCreditSales = await creditModel.aggregate([
                {"$match":{ddbranch: req.user.ddbranch}},
                {
                    "$group": {
                        _id: "$all",
                        totalCreditAmt: { $sum: "$amtpd" },
                        totalCreditTonn: { $sum: "$tonn" },
                        totalCreditUnit: { $sum: "$unitprice" },
                    }
                }
            ])
            //aggregate total purchases
            let totalPurchase = await purchModel.aggregate([
                {"$match":{ddbranch: req.user.ddbranch}},
                {
                    "$group": {
                        _id: "$all",
                        totalCost: { $sum: "$costprice" },
                        totalPurchTonnage: { $sum: "$tonn" },
                        totalUnit: { $sum: "$unitprice" },
                        totalSellPrice: { $sum: "$sellprice" },
                    }
                }
            ])

            res.render("creditSales", {
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
                produce: produceList,
                totalSales: totalSales[0],
                totalCreditSales: totalCreditSales[0],
                totalPurchase: totalPurchase[0]
            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops! Access Denied, login to continue")
        }
    })

//save sales into the db
router.post("/newCreditSales", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            const newSales = new creditModel(req.body)
            await newSales.save()
            res.redirect("/creditSales")
            // req.flash('success', 'Data posted successfuly')
            // res.redirect('/creditSales');
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Oops!, Something went wrong.');
        }
    })

//fetch sales from the db
router.get("/credit_list", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent, isAdmin,
    async (req, res) => {
        try {
            let items = await creditModel.find();
            let totalCreditSales = await creditModel.aggregate([
                {"$match":{ddbranch: req.user.ddbranch}},
                {
                    "$group": {
                        _id: "$all",
                        totalCreditAmt: { $sum: "$amtpd" },
                        totalCreditTonn: { $sum: "$tonn" },
                        totalCreditUnit: { $sum: "$unitprice" },
                    }
                }
            ])
            res.render("credit_list", {
                CreditSales: items,
                totalCreditSales: totalCreditSales[0],
            })
        }
        catch (err) {
            console.log(err)
            res.send("Could not retrieve sales")
        }
    })

//update selected sale 
router.get("/creditSalesUpdate/:id", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent, isAdmin,
    async (req, res) => {
        try {
            const produceList = await purchModel.find({ddbranch: req.user.ddbranch})//to fetch items
            const updateSale = await creditModel.findById({ _id: req.params.id })
            res.render("creditSalesUpdate", {
                CreditSale: updateSale,
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
                produce: produceList
            })

        } catch (error) {
            res.status(400).send('Cannot find item');
        }
    })

//save updated sale item
router.post("/creditSalesUpdate", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await creditModel.findByIdAndUpdate({ _id: req.query.id }, req.body)
            res.redirect("/credit_list")
        } catch (error) {
            res.status(400).send('Error Updating the Item');

        }
    })

//delete sale
router.post("/credit_list", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await creditModel.deleteOne({ _id: req.body._id })

            res.redirect("/credit_list")
        }
        catch (err) {
            res.status(400).send("Unable to delete item from the db")
        }
    })

//Export module
module.exports = router;