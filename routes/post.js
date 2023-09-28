const jwtAuth = require("../middlewares/auth").middlewareAuth
const Router = require("express").Router()
const postController = require("../controllers/postController")



Router.get('/posts',postController.get_posts)
Router.get('/posts/:id',postController.get_post)
Router.post('/posts/:id/update',jwtAuth,postController.update_post)
Router.post('/posts/create',jwtAuth,postController.create_post)
Router.post('/posts/:id/delete',jwtAuth,postController.delete_post)



module.exports=Router