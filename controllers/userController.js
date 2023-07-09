const { body, validationResult } = require("express-validator");
const User = require("../models/User")
const asyncHandler = require("express-async-handler")

exports.register=[
    body("name","Name is required").trim().isLength({min:1}).escape(),
    body("password","Password must be longer than 5 characters").isLength({min:6}),
    body("cpassword","Repeat password must be the same as password").custom((value,{req})=>{
        return value === req.body.password;
    }),
    asyncHandler(async(req,res,next)=>{
        const name = req.body.name
        const password = req.body.password
        const user = new User({name})
        await User.register(user,password)

        res.send("User created successfully")
    })
]

