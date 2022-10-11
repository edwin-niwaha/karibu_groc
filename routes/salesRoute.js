//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");
const flash = require('connect-flash');

const { isManager } = require("../auth/authorization")
const { isSalesAgent } = require("../auth/authorization")
const { isManagerOrSalesAgent } = require("../auth/authorization")
const { isAdmin } = require("../auth/authorization")

//Import User model
const salesModel = require('../models/salesModel');
const creditModel = require('../models/creditModel');
const purchModel = require('../models/purchModel');
const itemsModel = require('../models/itemsModel');

/*
router.get("/fetchProduce",  async (req, res) => {
    try {
        // console.log(req.query.branch)
        const purchaseTonnage = await purchModel.find({prodname: req.query.prodName, ddbranch: req.user.ddbranch})
        const cashSaleTonnage = await salesModel.find({prodname: req.query.prodName, ddbranch: req.user.ddbranch})
        const creditSaleTonnage = await creditModel.find({prodname: req.query.prodName, ddbranch: req.user.ddbranch})
        // x-prev y-current value
        const totalPurchTonnage = purchaseTonnage.reduce((prev, curr) => prev + curr.tonn, 0)
        const totalSales = cashSaleTonnage.reduce((prev, curr) => prev + curr.tonn, 0)
        const totalCreditSales = creditSaleTonnage.reduce((prev, curr) => prev + curr.tonn, 0)
        const currentTonnage = totalPurchTonnage - (totalSales + totalCreditSales)

        // res.json({currentTonnage})
        res.status(200).json({currentTonnage})
    }
    catch (error) {
        console.log(error);
    }
})
*/
//Display Sales page
router.get("/add_sales", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
    async (req, res) => {
        try {
            // console.log(req.user)
            const produceList = await purchModel.find({ ddbranch: req.user.ddbranch })
            // aggregate cash sales
            let totalSales = await salesModel.aggregate([
                {
                    "$match": {
                        $and: [
                            // { ddbranch: { $in: ['Kabale'] } },
                            { ddbranch: req.user.ddbranch },
                            // { sku: { $in: ['SB-003'] } },
                        ]
                    }
                },
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
        "$match": {
            ddbranch: req.user.ddbranch,
        }
    },
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
        "$match": {
            ddbranch: req.user.ddbranch,
        }
    },
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
res.render("add_sales", {
    username: req.user.firstname + " " + req.user.surname,
    branch: req.user.ddbranch,
    email: req.user.email,
    role: req.user.role,
    sku: req.body.sku,
    produce: produceList,
    totalSales: totalSales[0],
    totalCreditSales: totalCreditSales[0],
    totalPurchase: totalPurchase[0]
})
        }
        catch (err) {
    // console.log(err)
    res.send("Oops!, Something went wrong.")
}
    })

//save sales into the db
router.post("/newSales", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
    async (req, res) => {
        try {
            // const prodname = await purchModel.findOne({prodname: req.body.prodname})
            // if (prodname.tonn < req.body.prodname) {
            //     res.send(`<p>this is the tonnage of produce ${prodname.tonn}</p>`)
            // return
            // }
            const { body, user } = req
            // console.log(body, user)
            //const newSales = new salesModel(req.body)
            const newSales = new salesModel(body)
            await newSales.save()
            res.redirect("/add_sales")
        }
        catch (err) {
            // console.log(err);
            res.status(400).send('Oops!, Something went wrong.');
        }
    })

//fetch sales from the db // 
router.get("/sales_list", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
    async (req, res) => {
        try {
            // console.log("Denis");
            let items = await salesModel.find({ ddbranch: req.user.ddbranch });
            let totalSales = await salesModel.aggregate([
                { "$match": { ddbranch: req.user.ddbranch } },
                {
                    "$group": {
                        _id: "$all",
                        totalAmt: { $sum: "$amtpd" },
                        totalTonn: { $sum: "$tonn" },
                        totalUnit: { $sum: "$unitprice" },
                    }
                }
            ])
            res.render("sales_list", {
                Sales: items,
                totalSales: totalSales[0],
            })
        }
        catch (err) {
            // console.log(err)
            res.send("Could not retrieve sales")
        }
    })

//update selected sale 
router.get("/salesUpdate/:id", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
    async (req, res) => {
        try {
            const produceList = await purchModel.find({ ddbranch: req.user.ddbranch })//to fetch items
            const updateSale = await salesModel.findById({ _id: req.params.id })
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
            res.render("salesUpdate", {
                Sale: updateSale,
                username: req.user.firstname + " " + req.user.surname,
                branch: req.user.ddbranch,
                email: req.user.email,
                role: req.user.role,
                produce: produceList,
                totalSales: totalSales[0],
                totalPurchase: totalPurchase[0]
            }
            )

        } catch (error) {
            res.status(400).send('Cannot find item');
        }
    })

//save updated sale item
router.post("/salesUpdate", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
    async (req, res) => {
        try {
            await salesModel.findByIdAndUpdate({ _id: req.query.id }, req.body)
            res.redirect("/sales_list")
        } catch (error) {
            res.status(400).send('Error Updating the Item');

        }
    })

//delete sale
router.post("/sales_list", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        try {
            await salesModel.deleteOne({ _id: req.body._id })

            res.redirect("/sales_list")
        }
        catch (err) {
            res.status(400).send("Unable to delete item from the db")
        }
    })

//Export module
module.exports = router;