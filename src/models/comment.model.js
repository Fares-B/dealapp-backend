const {Schema, model} = require('mongoose');

const commentSchema = Schema({
    dealId: {
        type: Schema.Types.ObjectId,
        ref: 'deal',
        required: true,
    },
    author: {
        type: Object,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

module.exports = model('comments', commentSchema);
