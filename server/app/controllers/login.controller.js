const express = require('express');
const bcrypt = require('bcrypt');
const db = require("../config/db.config.js");
const env = require('../config/env.js');
const User = db.users;
const Op = db.Sequelize.Op;
const router = express.Router();

// grab User model from the models folder
const { User } = require('../models');

// Register Route
router.post('/Signup', async (req, res) => {

  // hash the password provided by the user with bcrypt
  const hash = bcrypt.hashSync(req.body.password, 10);
  const username = req.body.username;

  try {
    // create a new user with the password hash from bcrypt
    let user = await User.create(
      Object.assign(req.body, { password: hash })
    );

    // data will be an object with the user and it's authToken
    let data = await user.authorize();

    // send back the new user and auth token to the client { user, authToken }
    return res.json(data);

  } catch(err) {
    return res.status(400).send(err);
  }

});

// Login Route
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // if the username / password is missing, use status code 400 to indicate that
  if (!username || !password) {
    return res.status(400).send(
      'Request missing username or password param'
    );
  }

  try {

    // get the authentication token for the given username and password
    let user = await User.authenticate(username, password)

    return res.json(user);

  } catch (err) {
    return res.status(400).send('invalid username or password');
  }

});

// Logout Route
router.delete('/logout', async (req, res) => {

  const { user, cookies: { auth_token: authToken } } = req

  if (user && authToken) {
    await req.user.logout(authToken);
    return res.status(204).send()
  }

  // if  the user is not logged in, use status code 400 
  return res.status(400).send(
    { errors: [{ message: 'not authenticated' }] }
  );
});

// Me Route - get currently logged in user
router.get('/me', (req, res) => {
  if (req.user) {
    return res.send(req.user);
  }
  res.status(404).send(
    { errors: [{ message: 'missing auth token' }] }
  );
});

// export the router so we can pass the routes to our server
module.exports = router;
