
function rateLimit(req, res, next) {
    console.log("rateLimit");
    return next();
}

module.exports = rateLimit;
