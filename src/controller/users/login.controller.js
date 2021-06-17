const userSchema = require('../../models/user.model');
const bcrypt = require('bcrypt');

module.exports = async function login(req, res, next) {
    const {name, password} = req.body;

    const user = await userSchema.findOne({"name": name})
        .then(r => r)
        .catch(e => e);

    res.rawResponse = "error";

    if (user !== null) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const postUser = {
                _id: user._id,
                name: user.name,
                roles: user.roles
            };
            req.session.user = postUser;
            res.rawResponse = postUser;
        }
    }
    next();
};

// hash password with bcrypt
// bcrypt.hash("passwordPlain", 10, function(err, hash) {
//     console.log(hash)
// });
