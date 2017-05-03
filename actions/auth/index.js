module.exports = (app) => {
    return {
        login,
        signup
    };

    function login (req, res, next) {
        return res.send("<h1>Kiliman Auth</h1>");
    }

    // Create a new user if not exist
    // And return it access token
    function signup (req, res, next) {
        const User = app.models.User;

        User.findOne({email: req.body.username})
            .then(app.helpers.ensureEmpty)
            .catch(app.helpers.reject(409, 'user.already.exist'))
            .then(createUser)
            .then(logInUser)
            .catch(res.error);

        // Create a new user in database
        function createUser () {
            return new User({
                email: req.body.username,
                password: req.body.password
            })
            .save();
        }

        // Write the new user in RethinkDB to be used as auth user
        function logInUser (user) {
            app.horizon.adapter.getHorizonUser(req.body.username)
            .then(_ => {
                return res.json(user && app.horizon.adapter.makeLoginReply(app.hzConfig.token_secret, user._id));
            })
            .catch(res.error);
        }
    }
};