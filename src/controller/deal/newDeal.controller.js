const dealSchema = require('../../models/deal.model');
const mongoose = require("mongoose");


module.exports = async function newDeal(req, res, next) {
    const userId = mongoose.Types.ObjectId(res.locals.user._id);
    const deal = req.body;

    const groups = deal.groups.map(g => {
        return mongoose.Types.ObjectId(g._id);
    });

    const dealInsert = new dealSchema({
        author: userId,
        title: deal.title,
        image: deal.image,
        price: deal.price,
        startingPrice: deal.startingPrice,
        link: deal.link,
        code: deal.code,
        groups: groups,
        location: deal.location,
        description: deal.description,
    });

    try {
        await dealInsert.save();
        res.rawResponse = true;
    } catch (error) {
        console.log(error)
        res.rawResponse = error;
    }
    next();
};
