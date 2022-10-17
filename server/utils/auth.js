const jwt = require('jsonwebtoken'); // compact URL safe-means of representing claims to be transferred between two parties
const { jwtConfig } = require('../config');
const User = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// setTokenCookie

// Send a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );

    const isProduction = process.env.NODE_ENV === 'production';


    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'lax'
    });

    return token;
};

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token')
        return next();
    });
}

// If there is no current usedr, return as an error
const requireAuth = function(req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.status = 400;
    return next(err);
};

module.exports = {
    setTokenCookie,
    restoreUser,
    requireAuth
}
