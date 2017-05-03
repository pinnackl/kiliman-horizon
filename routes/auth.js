const Router = require('express').Router;

module.exports = (app) => {
    let router = new Router();

    router.post('/login',
        app.middlewares.bodyParser.json(),
        app.middlewares.ensureFields(['username', 'password']),
        app.middlewares.crypt.cryptPassword('password'), // Compare password
        app.middlewares.localStrategy,
        app.middlewares.passport.authenticate('local'),
        app.actions.auth.login
    );

    router.post('/signup',
        app.middlewares.bodyParser.json(),
        app.middlewares.ensureFields(['username', 'password']),
        app.middlewares.crypt.cryptPassword('password'),
        app.actions.auth.signup
    );

    return router;
};