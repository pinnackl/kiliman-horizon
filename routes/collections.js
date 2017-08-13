const Router = require('express').Router;

module.exports = (app) => {
    let router = new Router();

    router.get('/list',
        app.middlewares.bodyParser.urlencoded(true),
        app.actions.collections.list
    );

    return router;
};