// Middleware function creator that checks a particular key on the request body.
const { check } = require('express-validator');
// Gathers teh results of the checks middleware that were run to determine which parts of the body are valid and invalid
const { validationResult } = require('express-validator');

// Middleware for formatting erros form express-validator middleware
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((err) => `${err.msg}`);

        const err = Error('Bad request');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request';
        next(err); 
    }
    next();
}


module.exports = {
    handleValidationErrors
}
