const { sum } = require('../utils');

function getSum(req, res, next) {
    res.rawResponse = sum(Object.values(req.query));
    return next();
}

module.exports = getSum;