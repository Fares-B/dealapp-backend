const dealSchema = require('../../models/deal.model');
const voteSchema = require('../../models/vote.model');
const groupSchema = require('../../models/group.model');

function getSort(filter, value="") {
    let sort = {"created_at": -1};
    switch (filter) {
        case "last":
            sort = {"created_at": -1};
            break;
        case "first":
            sort = {"created_at": 1};
            break;
        case "hot":
            sort = {"created_at": -1};
            break;
        case "group":
            sort = {"created_at": -1};
            break;
    }
    return sort;
}

module.exports = async function getAllDeals(req, res, next) {

    const limit = 5;
    const endCursor = (parseInt(req.query.page) * limit)  || 0;
    const filter = req.query.filter || "";
    let find = {};
    if (filter === "groups" || filter === "author") {
        find = {[filter]: req.query.value}
    }
    console.log(find)
    const deals = await dealSchema.find(find)
        .populate('author', ['name', '_id'])
        .sort(getSort(filter))
        .skip(endCursor)
        .limit(5)
        .then(async deals => {
            let allDealsNew = [];
            for (const deal of deals) {
                const votes = await voteSchema.find({dealId: deal._id});
                const vote = deal.calculateVote(votes);
                if (deal.groups.length > 0) {
                    const groups =  await groupSchema.find({ _id: {$in : deal.groups }}).select('name');
                    if (groups) {
                        deal.groups = groups;
                    }
                }
                allDealsNew.push(Object.assign({}, deal._doc, {vote}));
            }
            return allDealsNew;
        })
        .catch(e => e);

    res.rawResponse = deals;

    next();
}
