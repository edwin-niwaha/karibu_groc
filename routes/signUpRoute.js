//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isManager } = require("../auth/authorization");
const { isAdmin } = require("../auth/authorization");
const connectEnsureLogin = require("connect-ensure-login");

//Import signUpModel][poikj ]
const signUpModel = require('../models/signUpModel');

router.get("/signup", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
(req, res) => {
    res.render("signUp");
});

router.get("/signup", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
    async (req, res) => {
        try {
            //console.log(req.user.firstname)
            let items = await signUpModel.find({ ddbranch: req.user.ddbranch });
            res.render("signup", { signups: items })
        }
        catch (err) {
            console.log(err)
            res.send("Could not retrieve roles")
        }
    })

//save record into the db
router.post("/signup", connectEnsureLogin.ensureLoggedIn(), isManager, isAdmin,
    async (req, res) => {
        const signup = new signUpModel(req.body);
        // console.log(req.body);
        await signUpModel.register(signup, req.body.password, (err) => {
            if (err) {
                //render to signUp page
                res.status(400).render("signUp");
                console.log(err);
            } else {
                //redirect to login page using a path
                res.redirect("/signup");
            }
        });
    });

    router.get('/logout', (req, res)=>{
        req.session.destroy(()=>{
            res.redirect('/login')
        })
      })
      
module.exports = router