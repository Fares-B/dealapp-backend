const userSchema = require('../../models/user.model');
const bcrypt = require('bcrypt');

module.exports = async function signup(req, res, next) {
    const { name, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new userSchema({
        name: name,
        password: passwordHash
    });

    try {
        await user.save();
        res.rawResponse = true;
    } catch (error) {
        res.rawResponse = false;
    }
    next();
}
