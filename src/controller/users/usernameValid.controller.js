const userSchema = require('../../models/user.model');

module.exports = async function usernameValid(req, res, next) {
    const {name} = req.body;

    const user = await userSchema.findOne({"name": name})
        .then(r => r)
        .catch(e => e);

    res.rawResponse = !user;

    next();
};

// hash password with bcrypt
// bcrypt.hash("passwordPlain", 10, function(err, hash) {
//     console.log(hash)
// });
