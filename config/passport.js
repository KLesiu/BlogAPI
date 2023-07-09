const passport = require('passport')
const User = require('../models/User')
const ExtractJWT = require('passport-jwt').ExtractJwt
const JWTStrategy = require('passport-jwt').Strategy
require("dotenv").config()



function verifyCallback(payload, done) {
    return User.findOne({_id: payload.id,admin:true})
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}

exports.passportConfig= ()=>{
    passport.use(User.createStrategy())
    passport.use(new JWTStrategy({jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),secretOrKey:process.env.JWT_SECRET},verifyCallback))
}
