const {Schema, model} = require('mongoose');

const groupSchema = Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

module.exports = model('group', groupSchema);
