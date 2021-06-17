const commentSchema = require('../../models/comment.model');
const mongoose = require('mongoose');


module.exports = async function getDealComments(req, res, next) {
    const dealId = new mongoose.mongo.ObjectId(req.params.id);
    const comments =  await commentSchema.find({ dealId: dealId }).then(c => c ).catch(e => e);
    res.rawResponse = comments;
    next();

}
