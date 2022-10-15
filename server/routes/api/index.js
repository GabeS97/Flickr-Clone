// The purpose of Express if to be a REST API server. All routes will be nested;
const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send('this is finally working ')
})

module.exports = router;
