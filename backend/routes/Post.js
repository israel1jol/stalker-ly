const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const {validateToken, validateAuth} = require("../middleware/index");
const upload = require("../middleware/upload");

router.post("/posts", (req, res) => {
    Post.find({userId : req.body.userId}, (err, posts) => {
        if(err) return res.json({"Error" : err})
        else{
            return res.json(posts);
        }
    })
})

router.post("/followerPosts",validateAuth, async (req, res) => {
    const id = req.user.userId;
    const user = await User.findOne({_id : id});
    let feed = [];
    let users = [];
    let following_arr = user.following;
    if(following_arr.length < 1) return res.json({"data":"No followers"});
    for(let i = 0; i < following_arr.length; i++){ 
        const posts = await Post.find({userId:following_arr[i]}).limit(5);
        const poster = await User.findOne({_id : following_arr[i]});
        feed.push(posts);
        users.push(poster);
    }
    return res.json({"feed":feed, "user":users});


})

router.post('/uploadPost', upload.single("path"), validateAuth, (req, res) => {
    const body = req.body.postDetail;
    const id = req.user.userId;
    const imgFile = req.file.path ? req.file.path : "";

    Post.create({userId : id, postBody:body, img: imgFile, likes:[]}, (err, post) => {
        if(err) return res.json({"Error" : err})
        else{
            return res.status(200).json(post)
        }
    })})

router.put("/updatePostLikes/:id", validateAuth, (req, res) => {
    const id = req.params.id;
    const data = req.body.data;
    Post.findOne({_id : id}, (err, post) => {
        if(err) return res.json({"error" : "Can't update post likes", "message":err});
        let likes = post.likes;
        if(likes.includes(data)){
            likes = likes.filter(id => id !== data);
        }
        else{
            likes.push(data);
        }
        post.likes = likes;
        post.save();
        return res.json(post);
    })
})

module.exports = router