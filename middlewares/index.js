/////////////////
// Middlewares //
/////////////////
module.exports = (app) => {
    app.use(require('./../middlewares/res'));
    app.middlewares = {
        cookieParser: require('cookie-parser'),
        bodyParser: require('body-parser'),
        expressSession: require('express-session'),
        passport: require('passport'),
        passportLocal: require('passport-local'),
        jwt: require('jsonwebtoken'),
        ensureFields: require('./ensureFields'),
        crypt: require('./crypt')(app)
    };

    // Load dependent middlewares
    app.middlewares.localStrategy = require('./localStrategy')(app);
};