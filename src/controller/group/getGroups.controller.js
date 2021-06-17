const groupSchema = require('../../models/group.model');

module.exports = async function getGroups(req, res, next) {

    const groups = await groupSchema.find().select('name')
        .then(r => r)
        .catch(e => e);

    if (groups !== null) {
        res.rawResponse = groups;
    } else {
        res.rawResponse = [];
    }

    next();
}
