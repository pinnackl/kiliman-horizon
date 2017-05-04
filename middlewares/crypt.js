const bcrypt = require('bcrypt');

module.exports = (app) => {

    return {
        cryptPassword,
        comparePassword
    };

    function cryptPassword(passwordField) {
        return (req, res, next) => {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    return res.error(err);
                }

                bcrypt.hash(req.body[passwordField], salt, function(err, hash) {
                    if (err) {
                        return res.error(err);
                    }
                    req.body[passwordField] = hash;

                    next();
                });
            });
        };
    };

    function comparePassword(password, userPassword, callback) {
        bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
            if (err) {
                return callback(err);
            }
            return callback(null, isPasswordMatch);
        });
    };
};