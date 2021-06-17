const {Schema, model} = require('mongoose');

const dealSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    startingPrice: {
        type: Number,
    },
    link: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        default: false
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'group'
        }
    ],
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    toJSON: { virtuals: true },
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

dealSchema.method('calculateVote', function(votes) {
    let totalVotes = 0;
    for (let i = 0; i < votes.length; i++) {
        const vote = votes[i];
        if (vote.vote) {
            totalVotes++
        } else {
            totalVotes--;
        }
    }
    return totalVotes;
});

module.exports = model('deal', dealSchema);
