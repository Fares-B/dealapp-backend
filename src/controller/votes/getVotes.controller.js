const voteSchema = require('../../models/vote.model');

module.exports = async (req, res, next)=> {
    const dealId = req.params.id;
    const votes = await voteSchema.find({dealId: dealId});

    res.rawResponse = votes;
    next();
};
