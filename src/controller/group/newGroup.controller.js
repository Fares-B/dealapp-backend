const groupSchema = require('../../models/group.model');

module.exports = async function newDeal(req, res, next) {

    const {name} = req.body;

    const groupInsert = new groupSchema({
        name: name,
    });

    try {
        await groupInsert.save();
        res.rawResponse = true;
    } catch (error) {
        console.log(error)
        res.rawResponse = false;
    }
    next();
};
