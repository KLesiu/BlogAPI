const jwtAuth = require("../middlewares/auth").middlewareAuth
const Router = require("express").Router()
const commentController = require("../controllers/commentController")

Router.get('/posts/:id/comments',commentController.get_comments_from_post)
Router.post('/posts/:id/add-comment',jwtAuth,commentController.post_comment)

module.exports = Router