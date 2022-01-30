const User = require("../models/User");
const Token = require("../models/Token");
const Post = require("../models/Post");
const route = require("express").Router();
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");
const {validateToken, validateAuth} = require("../middleware/index");
const upload = require("../middleware/upload")

route.post("/allUsers",validateAuth, async (req, res) => {
    const user = await User.find({_id:req.user.userId});
    const users = await User.find().limit(40);
    
    return res.json({"client_profile":user, "allUsers":users});

})



route.post('/create', upload.single("path"), (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const email = req.body.email;
    const gender = req.body.gender;
    const path = req.file.path || "";
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            User.create({firstname:firstname, lastname:lastname, username:username,gender:gender ,email:email, password:hash, profilePic:path}, (err, user) => {
                if(err) return res.status(403).json({"error":"Can't create user", "message":err});
                return res.json(user);
            })
        })
    })
})

route.post('/refToken', (req, res) => {
    const username = req.body.username;
    const password  = req.body.password;

    User.findOne({username : username}, (err, user) => {
        if(user){
            bcrypt.compare(password, user.password, (err, val) => {
                if(val){
                    const refToken = jwt.sign({userId:user._id, password:password}, process.env.REFRESH_KEY);
                    token = new Token({name : refToken});
                    token.save();
                    return res.json({"refreshToken": refToken});
                }
                else{
                    return res.json({"error" : "Invalid credential::password"});
                }
            })
        }
        else{
            return res.json({"error" : "Invalid credential::username"});
        }
    })
})

route.get('/accToken', validateToken, (req, res) => {
    const payload = req.user;
    const token = jwt.sign(payload, process.env.ACCESS_KEY, {expiresIn:10800});
    return res.json({accessToken : token }); 
})

route.post("/userInfo", validateAuth, (req, res) => {
    User.findById(req.user.userId, (err, user) => {
        return res.json(user); 
    })
})

route.put("/updateProfile/profilePic", upload.single("path"), validateAuth, (req, res) => {
    const path = req.file.path || "";
    const userId = req.user.userId;
    User.findById(userId, (err, user) => {
        if(err) return res.json({"error": "Can't find user"})
        user.profilePic = path;
        user.save();
        return res.json(user);
    })
})

route.put("/updateProfile/following", validateAuth, async (req, res) => {
    const user = await User.findById(req.user.userId);
    const profile = await User.findById(req.body.profileId)
    const following = req.body.following;
    const followers = req.body.followers;
    user.following = following;
    profile.followers = followers;
    user.save();
    profile.save();
    return res.json({"user":user, "profile":profile});
})

route.delete("/deleteProfile", validateAuth, (req, res) => {
    const userId = req.user.userId;
    User.findByIdAndDelete(userId, (err, doc, res) => {
        if(err) return res.json({"error":"Could not delete user"})
        return res.json(res);
    })
})

route.put("/updateProfile/:profile", validateAuth, (req, res) => {
    const userId = req.user.userId;
    const data = req.body.data;
    const query = req.params.profile;
    User.findById(userId, (err, user) => {
        switch(query){
            case "firstname":
                user.firstname = data;
                break;
            case "lastname":
                user.lastname = data;
                break;
            case "gender":
                user.gender = data;
                break;
            case "username":
                user.username = data;
                break;
            case "email":
                user.email = data;
                break;
            case "password":
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(data, salt, (err, hash) => {
                        user.password = hash;
                    })
                })
                break;
            default:
                return;
            }
        user.save();
        return res.json(user);
    })
})

route.post("/:username", async (req, res) => {
    const accName = req.params.username;
    const acc = await User.findOne({username:accName});
    const accPosts = await Post.find({userId:acc._id});
    if(req.body.token){
        const token = req.body.token;
        const profile = await jwt.verify(token, process.env.ACCESS_KEY);
        const user = await User.findById(profile.userId);
        return res.json({"user":user, "profile":acc, "posts":accPosts});
    }
    else{
        return res.json({"profile":acc, "posts":accPosts});
    }
    
    
})

module.exports = route;