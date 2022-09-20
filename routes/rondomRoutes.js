//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");

const { isManager } = require("../auth/authorization")
const { isSalesAgent } = require("../auth/authorization")
const { isDirector } = require("../auth/authorization")
const { isAdmin } = require("../auth/authorization")

const salesModel = require('../models/salesModel');
const purchModel = require('../models/purchModel');

//fetch route
router.get("/directorDash", connectEnsureLogin.ensureLoggedIn(), isDirector,
    async (req, res) => {
        try {
            // console.log(req.user)
            let totalSales = await salesModel.aggregate([
                {
                    "$group": {
                        _id: "$all",
                        totalAmt: { $sum: "$amtpd" },
                        totalTonn: { $sum: "$tonn" },
                        totalUnit: { $sum: "$unitprice" },
                    }
                }
            ])
            //aggregate total purchases
            let totalPurchase = await purchModel.aggregate([
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
            res.render("directorDash", {
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                role: req.user.role,
                email: req.user.email,
                totalSales: totalSales[0],
                totalPurchase: totalPurchase[0]
            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops! Access Denied, login to continue")
        }
    })

router.get("/managerDash", connectEnsureLogin.ensureLoggedIn(), isManager,
    async (req, res) => {
        try {
            //console.log(req.user)
            let totalSales = await salesModel.aggregate([
                {
                    "$group": {
                        _id: "$all",
                        totalAmt: { $sum: "$amtpd" },
                        totalSoldTonnage: { $sum: "$tonn" },
                        totalUnit: { $sum: "$unitprice" },
                    }
                }
            ])
            //aggregate total purchases
            let totalPurchase = await purchModel.aggregate([
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
            res.render("managerDash", {
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
                totalSales: totalSales[0],
                totalPurchase: totalPurchase[0]
            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops! Access Denied, login to continue")
        }
    })

router.get("/salesAgentDash", connectEnsureLogin.ensureLoggedIn(), isSalesAgent,
    async (req, res) => {
        try {
            res.render("salesAgentDash", {
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

router.get("/adminDash", connectEnsureLogin.ensureLoggedIn(), isAdmin,
    async (req, res) => {
        try {
            res.render("adminDash", {
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

module.exports = router;
