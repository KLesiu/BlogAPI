const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")
require('dotenv').config()
const Post = require("../models/Post")



exports.get_posts =async(req,res,next)=>{
    const allPosts = await Post.find().exec()
    const count = await Post.count()
    if(count==0)res.status(404).json("")
     return res.status(200).json(allPosts)

}

exports.get_post=async(req,res,next)=>{
    const post = await Post.findOne({_id:req.params.id}).exec()
    if(post===null)res.status(404).json('Post not found')
    return res.status(200).json(post)
}


exports.create_post=[
    body("title","Title is required").trim().isLength({min:1}).escape(),
    body('body','Body is required').isLength({min:1}),
   
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()) res.json(errors.array())
        
       
        const title = req.body.title
        const body = req.body.body
        const published = req.body.published
        const post = await new Post({title:title,body:body,published:published}).save()
        return res.json(post)
    })
]

exports.update_post=[
    body("title","Title is required").trim().isLength({min:1}).escape(),
    body('body','Body is required').isLength({min:1}),
    
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty())res.json(errors.array())
        
        if(req.user.admin === false) res.json("You dont have permissions to update post")
        
        const title = req.body.title
        const body = req.body.body
        const published = req.body.published
        const post = new Post({title:title,body:body,published:published,_id:req.params.id})
        await Post.findByIdAndUpdate(req.params.id,post)
        return res.status(200).json({post,message:"Post updated!"})
    })
]

exports.delete_post=async(req,res,next)=>{
    const post = await Post.findByIdAndDelete(req.params.id)
    if(!post) return res.status(404).json("Post with this id doesnt exist")
    
    
    res.json("Post deleted!")

}