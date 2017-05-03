module.exports = (app) => {
    const LocalStrategy = app.middlewares.passportLocal.Strategy;

    return (req, res, next) => {
        app.middlewares.passport.use(new app.middlewares.passportLocal.Strategy(function(username, password, done) {
            console.log(username, password);
            // levelUserDb.checkPassword(username, password, function(err) {
            //     if (err) {
            //         done(err);
            //     } else {
            //         getHorizonUser(username)
            //             .then(user => done(null, user)).catch(done);
            //     }
            // });
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