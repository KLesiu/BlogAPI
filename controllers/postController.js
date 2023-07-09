const { body, validationResult } = require("express-validator");
const User = require("../models/User")
const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Post = require("../models/Post")

exports.get_posts =async(req,res,next)=>{
    const allPosts = await Post.find().exec()
    const count = await Post.count()
    if(count==0) return res.status(404).json("We dont have any post!")
     return res.status(200).json(allPosts)

}