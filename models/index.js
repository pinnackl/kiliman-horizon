////////////
// Models //
////////////
const mongoose = require('mongoose');
const bluebird = require('bluebird');

module.exports = (app) => {
    app.mongoose = mongoose.connect(app.settings.db.mongo.url + '/' + app.hzConfig.project_name);	console.log('==> Connecting database...' . magenta, app.settings.db.mongo.url + '/' + app.hzConfig.project_name);
    app.mongoose.Promise = bluebird;
    app.models = {
        User: require('./User/User')(app)
    }
};
