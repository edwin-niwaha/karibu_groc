//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");

router.get("/salaries", connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
        if(req.user.role=== "manager" || req.user.role==="director")
           {
            res.render("salaries")
           } 
           else{
            res.redirect("/salesAgentDash")
           }
        }
)


module.exports = router;
