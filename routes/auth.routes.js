const {verifySignUp} = require("../middleware");
const controller = require("../controller/auth.controller");
module.exports = function (app) {
    app.use(function(req,res,next){
        res.header(
            "Access-control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next()
    });
    app.post("/api/auth/signup",
    [verifySignUp.checkDuplicateUserOrEmail, verifySignUp.
    checkRolesExisted],
    controller.signup
    );
    app.post("/api/auth/signin",controller.signin)
};