
function authAdmin(req, res, next) {
    const { user } = res.locals;

    if (!user.roles.includes('admin')) {
        return res.status(403).json("you're not authorized");
    }

    return next();
}

module.exports = authAdmin;
