const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{type:String,maxLength:20,required:true},
    admin:{type:Boolean,required:false}
},{
    timestamps:true
})

UserSchema.plugin(passportLocalMongoose,{usernameField: 'name'})

module.exports = mongoose.model("User",UserSchema)