//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require('connect-flash');
// Render Login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page' });
});

//router.post("/login", function (req, res) {
router.post('/login', (req, res, next) => {
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.render('login', {loginerror: "Email or password is incorrect"}); 
        // res.send('<div class="container" style="color:red; text-align:center; font-size:24px; background-color:#CCCCFF; width:30%; height:200px; margin:0 auto; margin-top:5%; border-radius:5px;">Your email or password is incorrect! <br><hr> Enter a valid username and password combination  and <a href="http://localhost:8080/login"> login again</a></div>')
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        if (req.user.role === "inactive") {
          // req.flash('message', 'Oops! You need to be authenticated to login');
          res.send('<div class="container" style="color:red; text-align:center; font-size:28px; background-color:orange; width:70%; height:100px; margin:0 auto; border-radius:5px;">Access denied! You need to be authenticated to login. <br><hr> <a href="http://localhost:8080/contact"> You can contact us here </a> &nbsp; or &nbsp; <a href="http://localhost:8080/login">try to login again</a></div>')
        }
        else if (req.user.role === "manager") {
          return res.redirect('/managerDash');
        }
        else if (req.user.role === "director") {
          return res.redirect('/directorDash');
        }
        else {
          return res.redirect('/salesAgentDash');
        }
      });

    })(req, res, next);
});

// Export Login module 
module.exports = router;