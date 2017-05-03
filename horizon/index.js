/////////////
// Horizon //
/////////////

module.exports = (app, httpd) => {
    app.horizon = {
        hz: require('./horizon')(app, httpd),
        adapter: require('./adapter')(app)
    }
};