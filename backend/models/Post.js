const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema({
    userId:{type:String},
    postBody:{type:String},
    img:{type:String},
    likes:{type:Array}
}, {timestamps:true})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post