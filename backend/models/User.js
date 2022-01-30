const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    username:{type:String, unique:true},
    gender:{type:String},
    email:{type:String, unique:true},
    password:{type:String},
    profilePic:{type:String},
    followers:{type:Array},
    following:{type:Array}
}, {timestamps:true});

const User = mongoose.model("User", UserSchema);

module.exports = User;