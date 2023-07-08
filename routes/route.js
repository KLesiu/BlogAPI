const user_controller = require("../controllers/User")


module.exports = function(app){
    app.route("/users").get(user_controller.users_list)
}