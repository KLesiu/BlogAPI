const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
require("dotenv").config()
const User = require("../models/User")

passport.use(new LocalStrategy({
    nameField:"name",
    passwordField:"password"
},(username,password,done)=>{
    User.findOne({username},(err,user)=>{
        if(err) return done(err)
        if(!user) return done(null,false,{message:"Name does not exist"})

        // Verify password
        bcrypt.compare(password,user.password,(err,match)=>{
            if(err) return done(err)
            if(!match) return done(null,false,{message:"Incorrect Password"})
            return done(null,user,{message:"Logged in successfully"})
        })
    })
}))

passport.use(new JWTStrategy({
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},(jwtPayLoad,done)=>{
    return done(null,jwtPayLoad)
}))

module.exports = passport