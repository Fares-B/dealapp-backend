const userSchema = require('../../models/user.model');

module.exports = async function getUser(req, res, next) {
    const {userId} = req.params;
    const user = await userSchema.findById(userId)
        .select('name')
        .then(r => r)
        .catch(e => e);

    if (user !== null) {
        res.rawResponse = user;
    } else {
        res.rawResponse = {};
    }
    next();
}
