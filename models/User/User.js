const timestamps = require('mongoose-timestamps');

module.exports = (app) => {
    const Schema = app.mongoose.Schema;
    const UserSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        }
    });

    UserSchema.plugin(timestamps);
    return app.mongoose.model('User', UserSchema);
};