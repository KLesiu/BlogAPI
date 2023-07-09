const Router = require('express').Router()
const catchAsync = require("../config/errors")
const userController = require("../controllers/userController")


Router.post('/register',userController.register)

module.exports = Router
