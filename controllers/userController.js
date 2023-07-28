const { body, validationResult } = require("express-validator");
const User = require("../models/User")
const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.register=[
    body("name","Name is required").trim().isLength({min:1}).escape(),
    body("password","Password must be longer than 5 characters").isLength({min:6}),
    body("cpassword","Repeat password must be the same as password").custom((value,{req})=>{
        return value === req.body.password;
    }),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(404).send({
                errors: errors.array()
            })
        }
        const name = req.body.name
        const admin = req.body.admin || false
        const password = req.body.password
        const user = new User({name:name,admin:admin})
        await User.register(user,password)

        res.status(200).send({msg:"User created successfully"})
    })
]

exports.login = async function(req,res,next){
    const token = jwt.sign({id:req.user._id},process.env.JWT_SECRET,{expiresIn:2500})
    return res.send({token})
}

