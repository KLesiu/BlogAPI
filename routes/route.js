const user_controller = require("../controllers/User")


module.exports = function(app){
    app.route("/users").get(user_controller.users_list),

    app.route('/create-user').post(user_controller.user_create_post)
}
