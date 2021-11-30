const { User, authToken } = require('.../models');

module.exports = async function(req, res, next) {
    const token = req.cookies.token || req.headers.authorization;

    if (token) {
        const a_token = await authToken.find( {where: {token }, include: User }
            );

            if (a_token) {
                req.user = a_token.User;
            }
    }
    next();
}