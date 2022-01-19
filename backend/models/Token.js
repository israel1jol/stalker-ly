const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    name:String
}, {timestamps:true});

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;