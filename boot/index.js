//////////
// Boot //
//////////
module.exports = (app) => {
    const LocalStrategy = app.middlewares.passportLocal.Strategy;

    app.use(app.middlewares.cookieParser());
    app.use(app.middlewares.bodyParser.urlencoded({ extended: true }));
    app.use(app.middlewares.expressSession({ secret: 'secret', resave: false, saveUninitialized: false}));
    app.use(app.middlewares.passport.initialize());
    app.use(app.middlewares.passport.session());
    
    // CORS
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    return;
};