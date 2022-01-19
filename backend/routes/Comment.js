const Comment = require('../models/Comment')
const router = require('express').Router()



router.post('/post', accessToken, (req, res) => {
    Comment().find().then(all => res.json(all))
})