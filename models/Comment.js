const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User",required:true},
    body:{type:String,maxLength:1000,required:true,},
    post:{type:Schema.Types.ObjectId,ref:"Post",required:true},
    username:{type:String,maxLength:1000,required:true}
})

module.exports = mongoose.model("Comment",CommentSchema)