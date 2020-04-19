var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var ExistSchema = new mongoose.Schema({

    name:String,
   
    email:String
});

ExistSchema.plugin(passportLocalMongoose);
  
module.exports = mongoose.model("ExistingUser",ExistSchema);