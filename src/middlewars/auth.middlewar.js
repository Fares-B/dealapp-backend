
function auth(req, res, next) {
    if (req.headers.authorization) {
        return next();
    }

    console.log("access denied !");
    return res.status(403).send("access denied !");
}

module.exports = auth;
