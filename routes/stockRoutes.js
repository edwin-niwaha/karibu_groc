const express = require('express');
const router = express.Router();
const salesModel = require('../models/salesModel');

router.get("/stock_bal",
    async (req, res) => {
        try {
            let items = await salesModel.find();
            res.render("stock_bal", { Sales: items })
        }
        catch (err) {
            console.log(err)
            res.send("Could not retrieve sales")
        }
    })
module.exports = router;