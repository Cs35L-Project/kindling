const db = require("../config/db.config.js");
const env = require('../config/env.js');
const bcrypt = require('bcrypt');
const User = db.users;
const Op = db.Sequelize.Op;
const { fn, col } = db.Sequelize;

// Create and save a new User
exports.create = (req, res) => {
    console.log("USER CREATED")
    console.log(req.body)
    const hash = bcrypt.hashSync(req.body.password, 10) 
    
        // Save User in the database
        User.create({
            username: req.body.username,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            interests: req.body.interests
         })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating User."
            });
        });
      
   
};

const { u_auth } = require('../models/user.model');

// User login

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
    return res.status(400).send({
        message:
            err.message || "Missing username or password"
    });
  }
    
    let u_auth = await user.auth(username, password)
    u_auth = await u_auth.authorize();
    if (u_auth)
        return res.json(u_auth);
    else
        return res.status(400).send(err);
};


// Retrieve all Users from the database
exports.findAll = (req, res) => {
    const interests = req.query.interests;
    var condition = interests ? fn('JSON_CONTAINS', col('interests'), JSON.stringify(interests)) : null;
    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};


// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    console.log("UPDATING USER")
    const id = req.params.id;
    console.log(req.body)
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            console.log("INSIDE PROMISE")
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: "Cannot update User with id=${id}. Maybe User was not found or req.body is empty!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id + "."
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
            });
        });
};
