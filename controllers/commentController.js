const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")
const Post = require("../models/Post")
const Comment = require("../models/Comment")

exports.get_comments_from_post=async(req,res,next)=>{
    const currentPost = await Post.findById(req.params.id)
    const comments = await Comment.find({post:currentPost._id}).exec()
    const count = await Comment.count({post:currentPost._id})
    if(!currentPost){
        return res.status(404).json("We didnt find a post with this id")
    }
    if(count==0){
        return res.status(404).json("This post doesnt have any comments")
    }
   
    return res.status(200).json(comments)
}
exports.post_comment=[
    body('body','Comment body cant be empty').isLength({min:1}),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json(errors.array())
        }
        const post = await Post.findById(req.params.id)
        const comment = await new Comment({
            user:req.user,
            username: req.user.name,
            body:req.body.body,
            post:post._id
        }).save()
        return res.json(comment)
    })
]
