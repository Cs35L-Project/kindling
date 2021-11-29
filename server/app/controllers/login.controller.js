const bcrypt = require('bcrypt');
const db = require("../config/db.config.js");
const env = require('../config/env.js');
const User = db.users;
const Op = db.Sequelize.Op;

// grab User model from the models folder
const { user } = require('../models');

exports.login = (req, res) => {
  // make sure user exists
  User.findOne({username: req.body.username }).then(
    (user) => {
      if (!user) {
        return res.status(40).json({
          error: new Error("Cannot find specified user")
        });
      }
      // check that the password inputted is correct
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(400).json({
              error: new Error("Incorrect password")
            });
          }
          res.status(200).json({
            userId: user._id,
            token: 'token'
          });
          res.redirect('/home');
        }
      ).catch(
        (error) => {
          res.status(400).send(err);
        }
      );
    }
  ).catch(
    (error) => {
      res.status(400).send(err);
    }
  );
}


exports.logout() = (req, res) => {
  const { user, cookies: { authtoken: authToken } } = req
  if (user && authToken) 
  {
    await req.user.logout(authToken);
    return res.status(204).send()
  }

  return res.status(400).send('unable to logout');
}



