const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    username:{type:String, unique:true},
    email:{type:String, unique:true},
    password:{type:String},
}, {timestamps:true});

const User = mongoose.model("User", UserSchema);

module.exports = User;