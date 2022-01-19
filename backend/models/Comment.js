const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    userId:{type:String, required:true},
    body:{type:String, required:true}
}, {timestamps:true})

const Comment = mongoose.model('Comment', CommentSchema);