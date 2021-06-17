const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: Array,
        default: ['user'],
    },
},
{
    timestamps: {
        createdAt: "created_at",
        updatedAt:"updated_at",
    }
});

module.exports = model('users', userSchema);
