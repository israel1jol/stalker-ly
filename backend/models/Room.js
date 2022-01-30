const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    users:{type:Array},
    messages:{type:Array, defailt:[]}
}, {timestamps:true})

const Room = mongoose.model("room", RoomSchema);

module.exports = Room