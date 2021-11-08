module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Add routes here

  app.use('/api/users', router);
};
