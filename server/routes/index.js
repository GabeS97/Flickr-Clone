const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// router.get('/hello/world', function (req, res) {
//     // setting XSRF-TOKEN as name to the return value of req.csrfToken();
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.send('Hello World');
// })

router.use('/api', apiRouter);

router.get("/api/csrf/restore", (req, res) => {
    // Random token that is used to prevent random CSRF attacks
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({
        'XSRF-TOKEN': csrfToken,
    });
});

module.exports = router;
