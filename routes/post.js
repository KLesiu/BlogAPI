const jwtAuth = require("../middlewares/auth")
const Router = require("express").Router()
const postController = require("../controllers/postController")


Router.get('/posts',postController.get_posts)

module.exports=Router