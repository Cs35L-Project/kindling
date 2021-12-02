const fs = require("fs");

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { fn, col } = db.Sequelize;

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
    console.log(req.body)
    const id = req.params.id;
    const username = req.body.user;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const avatar = req.body.avatar;
    const bio = req.body.bio;
    const interests = req.body.interests;
    const likes = req.body.likes;
    const matches = req.body.matches;

    const form = {};
    if(username) form.username = username;
    if(password) form.password = password;
    if(firstName) form.firstName = firstName;
    if(lastName) form.lastName = lastName;
    if(avatar) form.avatar = avatar;
    if(bio) form.bio = bio;
    if(interests) form.interests = interests;
    if(likes) form.likes = likes;
    if(matches) form.matches = matches;

    User.update(form, {
        where: { id: id }
    })
        .then(num => {
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

// Upload an avatar for the User
exports.upload = (req, res) => {
    try {
        if (req.file == undefined) {
            return res.send({ message: "You must select a file." })
        }

        User.update({ avatar: req.file.filename }, {
            where: { id: req.body.body }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "User uploaded an avatar successfully."
                    });
                } else {
                    res.send({
                        message: "Cannot update an avatar with id=${id}. Maybe User was not found or req.body is empty!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error uploading an avatar for User with id=" + id + "."
                });
            });

    } catch (error) {
        return res.send({ message: `Error uploading image: ${error}` });
    }
}

// Get the User's avatar
exports.getAvatar = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                data = fs.readFileSync(data.avatar);
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

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

// Delete all Users from the database
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
