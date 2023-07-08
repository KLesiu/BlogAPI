const mongoose = require("mongoose")

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title:{type:String,maxLength:50,required:true},
    body:{type:String,maxLength:100000,required:true},
    published:{type:Boolean,required:true}
})

module.exports = mongoose.model("Post",PostSchema)