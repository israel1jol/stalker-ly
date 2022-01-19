const jwt = require("jsonwebtoken");
const Token = require("../models/Token");


const validateToken = async (req, res, next) => {
    const authToken = req.headers.authorization.split(" ");
    const token = authToken && authToken[1];
    const tok = await Token.findOne({name : token})
    if(token === null || tok === null){
        return res.json({"error" : "Invalid Token"});
    }
    jwt.verify(token, process.env.REFRESH_KEY, (err, payload)=> {
        if(err) return res.json({"error" : "Token invalid"});
        req.user = payload;
    })
    next();
}

module.exports = validateToken;