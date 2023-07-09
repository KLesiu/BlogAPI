const passport = require('passport')

exports.middlewareAuth = (req,res,next)=>{
    return passport.authenticate("jwt",{session:false})(req,res,next)
}