// dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const bodyParser = require('body-parser')
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const session = require('express-session');
const flash = require('connect-flash');

// Instantiations
const app = express();
app.locals.moment = require('moment'); //for date formating and global variable
// importing User Schema 
const Signup = require("./models/signUpModel")

// import routes
// const workerRoutes = require("./routes/workerRoutes")
const purchRoutes = require('./routes/purchRoutes');
const userRoutes = require('./routes/userRoutes');
const signUpRoutes = require('./routes/signUpRoute');
const loginRoutes = require('./routes/loginRoutes');
const randomRoutes = require('./routes/rondomRoutes');
const itemsRoute = require('./routes/itemsRoute');
const salaryRoute = require('./routes/salariesRoute');
const creditRoute = require('./routes/creditSales');
const uploads = require('./routes/uploadsRoute');
const salesRoute = require('./routes/salesRoute');
const contactRoute = require('./routes/contactRoute');
const feedbackRoute = require('./routes/feedbackRoute');
const userRegRoute = require('./routes/signUpUpdateRoute');
const branchRoute = require('./routes/branchRoute');
const stockRoute = require('./routes/stockRoutes');

//set a session for login
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
});

//Database configuration
mongoose.connect("mongodb://localhost:27017/karibudb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (!err) console.log("Connected to mongo DB");
        else console.log("Error connecting to mongoDB  " + err)
    })

//Load view engine
app.set('view engine', 'pug');
app.set('views', './views');
app.set("views", path.join(__dirname, "/views"))

// Middle ware
app.use(express.urlencoded({ extended: true }));

//Allow to send json to the server
app.use(express.json());

// middleware for serving static files
app.use(express.static('public'));
app.use('/public/images', express.static(__dirname + '/public'));
// app.use(express.static('files'))
app.use('/allUploads', express.static('allUploads'));

//start session
app.use(expressSession)

// configuring passport
app.use(passport.initialize());
app.use(passport.session());

//use flash
app.use(session({
    secret:'flashxpmx',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

//-----------------------------------
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());


//routes middleware
// app.use('/', workerRoutes)
app.use('/', loginRoutes);
app.use('/', userRoutes);
app.use('/', purchRoutes);
app.use('/', signUpRoutes);
app.use('/', randomRoutes);
app.use('/', itemsRoute);
app.use('/', salaryRoute);
app.use('/', creditRoute);
app.use('/', uploads);
app.use('/', salesRoute);
app.use('/', contactRoute);
app.use('/', feedbackRoute);
app.use('/', userRegRoute);
app.use('/', branchRoute);
app.use('/', stockRoute);

//page routes
app.get('/', (req, res) => {
    res.render('index')
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get("/signup", (req, res) => {
    res.render("signUp")
})
app.get('/UserUpdate', (req, res) => {
    res.render("UserUpdate")
})
app.get('/ulist', (req, res) => {
    res.render("ulist")
})
app.get("/branches", (req, res) => {
    res.render("branches")
}) 
app.get("/branch_list", (req, res) => {
    res.render("branch_list")
}) 
app.get("/forgot-password", (req, res) => {
    res.render("forgot-password")
})
app.get("/directorDash", (req, res) => {
    res.render("directorDash")
})
app.get("/managerDash", (req, res) => {
    res.render("managerDash")
})
app.get("/salesAgentDash", (req, res) => {
    res.render("salesAgentDash")
})
app.get("/add_purch", (req, res) => {
    res.render("add_purch")
})
app.get("/purch_list", (req, res) => {
    res.render("purch_list")
})
app.get("/add_item", (req, res) => {
    res.render("add_item")
})
app.get("/items_list", (req, res) => {
    res.render("items_list")
})
app.get("/salaries", (req, res) => {
    res.render("salaries")
})
app.get("/creditSales", (req, res) => {
    res.render("creditSales")
})
app.get("/uploads", (req, res) => {
    res.render("uploads")
})
app.get("/add_sales", (req, res) => {
    res.render("add_sales")
})
app.get("/sales_list", (req, res) => {
    res.render("sales_list")
}) 
app.get("/sales_rpt", (req, res) => {
    res.render("sales_rpt")
}) 
app.get("/credit_list", (req, res) => {
    res.render("credit_list")
}) 
app.get("/landing/collections", (req, res) => {
    res.render("landing/collections")
})
app.get("/landing/about", (req, res) => {
    res.render("landing/about")
})
app.get("/contact", (req, res) => {
    res.render("contact")
})
app.get("/feedback", (req, res) => {
    res.render("feedback")
})
app.get("/landing/cart", (req, res) => {
    res.render("landing/cart")
})
app.get("/logout", (req, res) => {
    res.render("logout")
})
app.get("/stock_bal", (req, res) => {
    res.render("stock_bal")
})
// app.get("/customerRegistration", (req, res) => {
//     res.render("customerRegistration")
// })

//Undefined route 
app.get('*', (req, res) => {
    res.status(404).send('Sorry, requested page not found.')
});

//Server configuration
port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));
