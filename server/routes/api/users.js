const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

// Sign up
router.post(
    '/',
    async (req, res) => {
        const { email, password, username } = req.body;
        console.log(req.body, '@@@@@@@@@@@@@@@@@@@@@@')
        const user = await User.signup({
            email,
            password,
            username
        });

        await setTokenCookie(res, user);
        return res.json({
            user
        })
    }
)

module.exports = router;
