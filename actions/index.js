/////////////
// Actions //
/////////////
module.exports = (app) => {
    app.actions = {
        auth: require('./auth')(app)
    }
};
