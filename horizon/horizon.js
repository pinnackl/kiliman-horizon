const horizon = require('@horizon/server');

module.exports = (app, httpd) => {

    const options = {
        project_name: app.hzConfig.project_name,
        rdb_host: app.hzConfig.rdb_host,
        rdb_port: app.hzConfig.rdb_port,
        rdb_user: app.hzConfig.rdb_user,
        rdb_password: app.hzConfig.rdb_password,
        permissions: false,
        auto_create_index: true,
        auto_create_collection: true,
        auth: { token_secret: app.hzConfig.token_secret }
    };
    const horizonServer = horizon(httpd, options);

    // Get the reference to the Horizon instance
    app.hz = horizonServer;

    return horizonServer;
}