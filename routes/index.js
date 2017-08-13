////////////
// Routes //
////////////
module.exports = (app) => {
	app.use('/auth', require('./auth')(app)),
	app.use('/collections', require('./collections')(app))
};
