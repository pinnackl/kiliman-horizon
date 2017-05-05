module.exports = (app) => {
    const LocalStrategy = app.middlewares.passportLocal.Strategy;

    return (req, res, next) => {
        app.middlewares.passport.use(new app.middlewares.passportLocal.Strategy(function(username, password, done) {

            app.middlewares.crypt.comparePassword(password, req.user.password, function (err, match) {
                if (err) {
                    done(err);
                } else if (match) {
                    app.horizon.adapter.getHorizonUser(req.user.email)
                        .then(user => done(null, user)).catch(done);
                }
            });

            next();
        }));
        app.middlewares.passport.serializeUser((user, done) => {
            done(null, user.hzid);
        });
        app.middlewares.passport.deserializeUser((hzid, done) => {
            done(null, {hzid: hzid});
        });
        next();
    };
};