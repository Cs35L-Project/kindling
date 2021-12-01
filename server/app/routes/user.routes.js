const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();

    // Retrieve all Users
    router.get("/", [authJwt.verifyToken], controller.findAll);

    // Retrieve a single User with id
    router.get("/:id", [authJwt.verifyToken], controller.findOne);

    // Update a User with id
    router.put("/:id", [authJwt.verifyToken], controller.update);

    // Delete a User with id
    router.delete("/:id", controller.delete);

    // Delete all Users
    router.delete("/", controller.deleteAll);

    app.use("/api/users", router);
};
