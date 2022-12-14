const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Log in

// Log in
router.post(
    '/',
    async (req, res, next) => {
        const { credential, password } = req.body;
        const user = await User.login({ credential, password });
        console.log(user, '!!!!!!!!!!!!!!!!!!')

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'Success;' })
    }
)

// Restore session user
router.get(
    '/',
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            })
        } else return res.json({});
    }
)

// start on phase 5 on backend
module.exports = router;
