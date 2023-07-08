const Users = require("../models/User")
const asyncHandler = require("express-async-handler")

exports.users_list=asyncHandler(async(req,res,next)=>{
    const allUsers = await Users.find().exec()
    res.json(allUsers)
})