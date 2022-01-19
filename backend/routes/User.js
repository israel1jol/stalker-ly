const User = require("../models/User");
const Token = require("../models/Token");
const route = require("express").Router();
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");
const validateToken = require("../middleware/index");

route.post('/create', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const email = req.body.email;
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            User.create({firstname:firstname, lastname:lastname, username:username, email:email, password:hash}, (err, user) => {
                if(err) return res.json({"error" : "User can't be created"})
                return res.status(200).json(user);
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
                    const refToken = jwt.sign({username:username, password:password}, process.env.REFRESH_KEY);
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
    const token = jwt.sign(payload, process.env.ACCESS_KEY, {expiresIn:3600});
    return res.json({accessToken : token }); 
})

module.exports = route;