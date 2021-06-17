const commentSchema = require('../../models/comment.model');
const mongoose = require('mongoose');

module.exports = function getUserComments(req, res, next) {
    const authorId = new mongoose.mongo.ObjectId(req.params.id);

    commentSchema.find({"author._id": authorId}).then(comments => {
        res.rawResponse = comments;
        next();
    }).catch(e => next(e));

}
