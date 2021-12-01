const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, x-refresh-token, Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();

    // Signup the User
    router.post(
        "/signup",
        verifySignUp.checkDuplicateUsername,
        controller.signup
    );

    // Signin the User
    router.post("/signin", controller.signin);

    // Refresh the token
    router.post("/refreshtoken", controller.refreshToken);

    app.use("/api/auth", router);
};