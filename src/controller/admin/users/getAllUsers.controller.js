const userSchema = require('../../../models/user.model');


module.exports = async function getAllUsers(req, res, next) {
    const users = await userSchema.find()
        .then(r => r)
        .catch(e => e);

    res.rawResponse = users;
    return next();

}