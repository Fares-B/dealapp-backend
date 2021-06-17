
function auth(req, res, next) {
    const { user } = req.session;

    if (!user) {
        return res.status(401).json("you're not connected");
    }
    res.locals.user = user;
    return next();
}

module.exports = auth;
