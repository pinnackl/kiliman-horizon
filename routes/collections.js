const Router = require('express').Router;

module.exports = (app) => {
    let router = new Router();

    router.get('/list',
        app.middlewares.bodyParser.urlencoded(true),
        app.actions.collections.list
    );

    router.get('/api/:collection', app.actions.collections.documents);

    router.get('/api/:collection/:id', app.actions.collections.document);

    return router;
};