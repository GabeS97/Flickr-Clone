const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// Validation Sign Up || Backend validations should be in an array
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please enter a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 30 })
        .withMessage('Please enter a username that is between 4 and 30 characters.'),
    check('username)')
        .not()
        .isEmail()
        .withMessage('The username cannot be an email.'),
    check('password')
        .exists({ checkFalse: true })
        .isLength({ min: 4, max: 100 })
        .withMessage('Please enter a password that is between 4 and 100 characters.'),
    handleValidationErrors
]
// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username } = req.body;
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
