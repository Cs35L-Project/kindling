const db = require("../models");
const config = require("../config/auth.config");
const { users: User, refreshTokens: RefreshToken } = db;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Signup a new User
exports.signup = (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);

    // Save User to Database
    User.create({
        username: req.body.username,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        interests: req.body.interests
    })
        .then(user => {
            res.send({ message: "User registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Signin the User
exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration
            });

            let refreshToken = await RefreshToken.createToken(user);

            res.status(200).send({
                id: user.id,
                username: user.username,
                accessToken: token,
                refreshToken: refreshToken,
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Refresh the token
exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = { refreshToken: req.headers["x-request-token"] };

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

        console.log(refreshToken)

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};