module.exports = (app) => {
    return (req, res, next) => {
        const User = app.models.User;

        return User.findOne({email: req.body.username})
            .then(app.helpers.ensureOne)
            .catch(app.helpers.reject(401, 'invalid.credentials'))
            .then(getUser)
            .catch(res.error);

        function getUser (user) {
            // Set the user in the request object
            req.user = user;
            next();
        }
    };
};