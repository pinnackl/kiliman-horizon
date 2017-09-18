const _ = require('lodash');
const horizon = require('@horizon/server');

module.exports = (app) => {

    const horizonServer = app.hz;

    // Init Reql connection
    horizonServer._reql_conn.ready().then(c => {
        app.conn = c.connection();
        app.r = horizon.r;
    });

    return {
        hzAsync,
        getDatabaseCollections,
        getDocuments,
        getDocument,
        getHorizonUser,
        makeLoginReply
    };

    // helper function that converts ReQL queries into promises
    function hzAsync(conn, query) {
        return new Promise((resolve, reject) => {
            query.run(conn, (err, cursor) => {
                if (err) {
                    reject(err);
                } else {
                    if (!_.isFunction(cursor.toArray)) {
                        resolve(cursor);
                    } else {
                        cursor.toArray((err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    }
                }
            });
        });
    }

    function getDatabaseCollections() {
        return hzAsync(app.conn, app.r.db(app.hzConfig.project_name).tableList());
    }

    function getDocuments(collection) {
        return hzAsync(app.conn, app.r.db(app.hzConfig.project_name).table(collection));
    }

    function getDocument(collection, id) {
        return hzAsync(app.conn, app.r.db(app.hzConfig.project_name).table(collection).get(id));
    }

    function getHorizonUser(username) {
        return new Promise(function(resolve, reject) {
            const q = () => app.r.db(app.hzConfig.project_name).table('users');
            hzAsync(app.conn, q().filter({id: username}))
                .then(function (hzUserQ) {
                    let hzUser = hzUserQ[0];
                    let sessionUser = {
                        hzid: username
                    };
                    let insertQ;
                    if (!hzUser) {
                        hzUser = {
                            groups: ['default', 'authenticated'],
                            id: username,
                        };
                        insertQ = hzAsync(app.conn, q().insert(hzUser));
                    }
                    return Promise.all([sessionUser, insertQ]);
                })
                .then(function (result) {
                    resolve(result[0]);
                })
                .catch(reject);
        });
    }

    // Function creates token for the given user.
    // Logic copied from `hz make-token` command
    function makeLoginReply(tokensecret, id) {
        const jwt = app.middlewares.jwt;
        let token = jwt.sign(
            { id, provider: null },
            new Buffer(tokensecret, 'base64'),
            { expiresIn: '1h', algorithm: 'HS512' } // FIXME : Make session expire configurable
        );

        return {token: token};
    }
};