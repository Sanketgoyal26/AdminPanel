var express=require('express')
var ejs=require('ejs')
var bodyParser=require('body-parser')
var passport = require("passport")
var User = require("./models/user");
var ExistUser = require("./models/existingusers");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var mongoose=require('mongoose').set('debug', true);

var app=express()

mongoose.connect("mongodb://localhost/AdminPanel")
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require("express-session")({
    secret:"Rusty is the best og in the world",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
var port = process.env.port || 3000

app.get('/', function(req, res)
{
    res.render('login')
})
app.get('/signup', function(req, res)
{
    res.render('signup')
})

app.get('/panel', function(req, res)
{
    res.render('panel')
})

app.post("/signup", function (req, res) {
    User.register(new User({ name : req.body.name,username:req.body.username, email: req.body.email}),req.body.password,  function (err, user) {
        if (err) {
            console.log(err);
            return res.render('signup');
        } 
        passport.authenticate("local")(req, res, function () {
            res.redirect("panel"); 
        });
    });
});
app.post("/", passport.authenticate("local", {
    successRedirect: "/panel",
    failureRedirect: "/"
}), function (req, res) {
    res.send("User is " + req.user.id);
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/panel");
}
app.listen(port , function(req, res)
{
    console.log("Server is running at port "+port)
})