// The purpose of Express if to be a REST API server. All routes will be nested;
const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models/');

router.use(restoreUser);

router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
)

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user)
    }
)

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    })
    setTokenCookie(res, user);
    return res.json({ user })
})
router.get('/test', (req, res) => {
    res.send('this is finally working ')
})


module.exports = router;
