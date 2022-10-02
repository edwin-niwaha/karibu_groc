//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");
const session = require('express-session');
const flash = require('connect-flash');
const { isManager } = require("../auth/authorization");
const { isAdmin } = require("../auth/authorization");
const { isSalesAgent } = require("../auth/authorization");
//Import model
const salesModel = require('../models/salesModel');
const purchModel = require('../models/purchModel');
const itemsModel = require('../models/itemsModel');
const branchModel = require('../models/branchModel');

//display report and fetch stoc balances
router.get("/stock_rpt", connectEnsureLogin.ensureLoggedIn(), isManager,
    async (req, res) => {
        try {
            let items = await purchModel.find();
            let totalPurchase = await purchModel.aggregate([
                {
                    "$group": {
                        _id: "$all",
                        totalExpense: { $sum: "$costprice" },
                        totalPurchTonnage: { $sum: "$tonn" },
                        totalUnit: { $sum: "$unitprice" },
                        totalSellPrice: { $sum: "$sellprice" },
                    }
                }
            ])

            res.render("stock_rpt", {
                purchases: items,
                totalPurchase: totalPurchase[0]

            })
        }
        catch (err) {
            console.log(err)
            res.send("Could not retrieve purchases")
        }
    })

module.exports = router;