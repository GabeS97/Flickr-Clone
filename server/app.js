// Entry point for app
const express = require('express');
require('express-async-errors');
const morgan = require('morgan'); // Log HTTP requests and errors // simplifies process
const cors = require('cors'); // allows configure the web API security
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize express app
const app = express();
// Connect morgan middleware for logging info about req and res
app.use(morgan('dev'));
// Add cookie-parser for parsing cookies
app.use(cookieParser());
// add express.json() middleware for parsing JSON bodies with request bodies of "Content-Type" = "application/json"
app.use(express.json());

if (!isProduction) {
    /**If the app is in production, the initialized app will apply cors middleware
     * to protect against requests made to this app from another domain and allowing to restrict resources from being access from external domains
     */

    app.use(cors());
};

// helmet helps to set a variety of headers to better source app
// helmet secures your express app by setting responses HTTP headers appropriately
app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin',
    })
);

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            // Cookies "lax" are not sent on normal cross-site subrequests but are sent when a user is navigating to the origin (i.e following a link)
            sameSite: isProduction && 'lax',
            httpOnly: true
        }
    })
);

app.use(routes); // Connect app to all of the routes

// If this resource is not found, the app will render these errors
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found");
    err.title = 'Resource Not Found!';
    err.errors = ["The requested resource couldn't be found"];
    err.status = 404;
    next(err);
});

// If there is an error and the error is an instance of ValidationError from the sequelize package, then the error was created from a sequelize database validation error
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation Error';
    }
    next(err);
})

// The error handler is for formatting the errors before returning JSON
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    })
})

module.exports = app;

// pause of backend phase 2 error handling
