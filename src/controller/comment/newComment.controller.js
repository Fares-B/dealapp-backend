const commentSchema = require('../../models/comment.model');
const mongoose = require("mongoose");

module.exports = async function newComment(req, res, next) {
    const dealId = mongoose.Types.ObjectId(req.params.id);
    const user = res.locals.user;

    const commentInsert = new commentSchema({
        author: {"name": user.name, "_id": user._id},
        dealId: dealId,
        content: req.body.content,
    });

    try {
        res.rawResponse = await commentInsert.save();
    } catch (error) {
        res.rawResponse = false;
    }
    return next();
};
