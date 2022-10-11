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
const creditModel = require('../models/creditModel');
const itemsModel = require('../models/itemsModel');

//fetch route
router.get("/directorDash", connectEnsureLogin.ensureLoggedIn(), isDirector,
    async (req, res) => {
        try {

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
            //kabale branch
            let totalSalesKleBr = await salesModel.aggregate([
                { "$match": { ddbranch: 'Kabale' } },
                {
                    "$group": {
                        _id: "$all",
                        totalAmtKle: { $sum: "$amtpd" },
                        totalTonnKle: { $sum: "$tonn" },
                        totalUnitKle: { $sum: "$unitprice" },
                    }
                }
            ])
            //kampala branch
            let totalSalesKlaBr = await salesModel.aggregate([
                { "$match": { ddbranch: 'Kampala' } },
                {
                    "$group": {
                        _id: "$all",
                        totalAmtKla: { $sum: "$amtpd" },
                        totalTonnKla: { $sum: "$tonn" },
                        totalUnitKla: { $sum: "$unitprice" },
                    }
                }
            ])
            //aggregate credit sales
            let totalCreditSales = await creditModel.aggregate([
                {
                    "$group": {
                        _id: "$all",
                        totalCreditAmt: { $sum: "$amtpd" },
                        totalCreditTonn: { $sum: "$tonn" },
                        totalCreditUnit: { $sum: "$unitprice" },
                    }
                }
            ])
            //kampala branch
            let totalCreditSalesKla = await creditModel.aggregate([
                { "$match": { ddbranch: 'Kampala' } },
                {
                    "$group": {
                        _id: "$all",
                        totalCreditAmt: { $sum: "$amtpd" },
                        totalCreditTonn: { $sum: "$tonn" },
                        totalCreditUnit: { $sum: "$unitprice" },
                    }
                }
            ])
            //kable branch
            let totalCreditSalesKle = await creditModel.aggregate([
                { "$match": { ddbranch: 'Kabale' } },
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
            //kpla branch purchases
            let totalPurchaseKlaBr = await purchModel.aggregate([
                { "$match": { ddbranch: 'Kampala' } },
                {
                    "$group": {
                        _id: "$all",
                        totalCostKpl: { $sum: "$costprice" },
                        totalPurchTonnageKpl: { $sum: "$tonn" },
                        totalUnitKpl: { $sum: "$unitprice" },
                        totalSellPriceKpl: { $sum: "$sellprice" },
                    }
                }
            ])
            //kabale branch purhcases
            let totalPurchaseKleBr = await purchModel.aggregate([
                { "$match": { ddbranch: 'Kabale' } },
                {
                    "$group": {
                        _id: "$all",
                        totalCostKle: { $sum: "$costprice" },
                        totalPurchTonnageKle: { $sum: "$tonn" },
                        totalUnitKle: { $sum: "$unitprice" },
                        totalSellPriceKle: { $sum: "$sellprice" },
                    }
                }
            ])
            res.render("directorDash", {
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                role: req.user.role,
                email: req.user.email,

                 totalSales: totalSales[0],
                totalSalesKleBr: totalSalesKleBr[0],
                totalSalesKlaBr: totalSalesKlaBr[0],
                totalCreditSales: totalCreditSales[0],
                totalCreditSalesKla: totalCreditSalesKla[0],
                totalCreditSalesKle: totalCreditSalesKle[0],
                totalPurchase: totalPurchase[0],
                totalPurchaseKlaBr: totalPurchaseKlaBr[0],
                totalPurchaseKleBr: totalPurchaseKleBr[0],
            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops!, Something went wrong.")
        }
    })

router.get("/managerDash", connectEnsureLogin.ensureLoggedIn(), isManager,
    async (req, res) => {
        try {
            //console.log(req.user)
            let totalSales = await salesModel.aggregate([
                { "$match": { ddbranch: req.user.ddbranch } },
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
                { "$match": { ddbranch: req.user.ddbranch } },
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
                { "$match": { ddbranch: req.user.ddbranch } },
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
                totalCreditSales: totalCreditSales[0],
                totalPurchase: totalPurchase[0],
                // stock: (totalPurchase.length > 0 && totalSales.length > 0 && totalCreditSales.length > 0) ?totalPurchase[0].totalPurchTonnage[0] - totalSales[0].totalSoldTonnage - totalCreditSales[0].totalCreditTonn : 0

            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops!, Something went wrong.")
        }
    })

router.get("/salesAgentDash", connectEnsureLogin.ensureLoggedIn(), isSalesAgent,
    async (req, res) => {
        try {
            //console.log(req.user)
            let totalSales = await salesModel.aggregate([
                { "$match": { ddbranch: req.user.ddbranch } },
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
                { "$match": { ddbranch: req.user.ddbranch } },
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
                { "$match": { ddbranch: req.user.ddbranch } },
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
            res.render("salesAgentDash", {
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
                totalSales: totalSales[0],
                totalCreditSales: totalCreditSales[0],
                totalPurchase: totalPurchase[0]
            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops!, Something went wrong.")
        }
    })

router.get("/adminDash", connectEnsureLogin.ensureLoggedIn(), isAdmin,
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
            //aggregate credit sales
            let totalCreditSales = await creditModel.aggregate([
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
            res.render("adminDash", {
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
                totalSales: totalSales[0],
                totalCreditSales: totalCreditSales[0],
                totalPurchase: totalPurchase[0]
            })
        }
        catch (err) {
            console.log(err)
            res.send("Oops!, Something went wrong.")
        }
    })

module.exports = router;
