const mongoose = require('mongoose');


mongoose.set('useCreateIndex', true);

const voteSchema = mongoose.Schema({
    dealId: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    vote: {
        type: Boolean,
        required: true,
    },
},
{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

voteSchema.index( { "authorId": 1, "dealId": 1}, { unique: true });

module.exports = mongoose.model('votes', voteSchema);
