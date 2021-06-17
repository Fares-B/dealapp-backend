const groupSchema = require('../../models/group.model');

module.exports = async function getGroup(req, res, next) {
    const {groupId} = req.params;
    const group = await groupSchema.findById(groupId)
        .select('name')
        .then(r => r)
        .catch(e => e);
    if (group !== null) {
        res.rawResponse = group;
    } else {
        res.rawResponse = {};
    }
    next();
}
