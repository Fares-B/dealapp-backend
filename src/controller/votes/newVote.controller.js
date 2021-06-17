const voteSchema = require('../../models/vote.model');

module.exports = async (req, res, next)=> {
    const vote = JSON.parse(req.body.vote) !== false;
    const voteInsert = new voteSchema({
        authorId: res.locals.user._id,
        dealId: req.params.id,
        vote: vote,
    });

    try {
        const r = await voteInsert.save();
        res.rawResponse = true;
    } catch (error) {
        res.rawResponse = false;
    }

    next();
};
