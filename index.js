var express=require('express')
var app=express()

app.set('view engine','ejs')
var port = process.env.port || 3000

app.get('/', function(req, res)
{
    res.render('login')
})
app.get('/signup', function(req, res)
{
    res.render('signup')
})
app.listen(port , function(req, res)
{
    console.log("Server is running at port "+port)
})