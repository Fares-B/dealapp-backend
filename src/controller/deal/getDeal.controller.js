const dealSchema = require('../../models/deal.model');
const voteSchema = require('../../models/vote.model');
const groupSchema = require('../../models/group.model');

module.exports = async function getDeal(req, res, next) {
    const { id: dealId } = req.params;

    const deal = await dealSchema.findById(dealId)
        .populate('author', ['name', 'id'])
        .then(r => r)
        .catch(e => e);

    if (deal !== null) {
        console.log(deal.groups)
        if (deal.groups.length > 0) {
            const groups = await groupSchema.find({ _id: {$in : deal.groups }}).select('name')
                .then(g => g);
            if (groups !== null) {
                deal.groups = groups;
            }
        }

        const votes = await voteSchema.find({dealId: deal._id});
        const vote = deal.calculateVote(votes);
        res.rawResponse = Object.assign({}, deal._doc, {vote});
    } else {
        res.rawResponse = "no deal for this id";
    }

    next();
}
