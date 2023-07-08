
const asyncHandler = require("express-async-handler")
const {body,validationResult}=require("express-validator")
const passport = require("passport")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require('jsonwebtoken');




exports.users_list=asyncHandler(async(req,res,next)=>{
    const allUsers = await User.find().exec()
    res.json(allUsers)
})


exports.user_create_post=[
    body("name","Name is required").trim().isLength({min:1}).escape(),
    body("password","Password must be longer than 5 characters").isLength({min:6}),
    body("cpassword","Repeat password must be the same as password").custom((value,{req})=>{
        return value === req.body.password;
    }),
            asyncHandler(async(req,res,next)=>{
                const findUser = await User.findOne({name:req.body.name})
                if(findUser) return res.json("User with this name is already exist")
                const errors = validationResult(req)
                if(!errors.isEmpty()) return res.json(errors.array())
                     
                     try {
                         bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                             if(err){
                                 return console.log(err)
                             }
                             const user = await new User({
                                name:req.body.name,
                                password:hashedPassword
                             }).save()
                             jwt.sign({name:user.name},process.env.JWT_SECRET,{expiresIn:'3600'},(err,token)=>{
                                if(err) console.log(err)
                               return res.status(200).json({
                                    token,
                                    user,
                                    message: "Signed Up Successfully"
                                })
                            })
                           
                         
                           });
                          
                       } catch(err) {
                         return next(err);
                       };
                
                
            })
            
            
            
        

]