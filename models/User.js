const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{type:String,maxLength:20,required:true},
    password:{type:String,maxLength:40,required:true},
    admin:{type:Boolean,required:false}
})

module.exports = mongoose.model("User",UserSchema)