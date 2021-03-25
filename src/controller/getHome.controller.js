const { sum } = require('../utils');

function getHomeAction(req, res, next) {
    
    res.rawResponse = "End";
    if (req.query.q) {
        res.rawResponse += "<br>" + req.query.q;
    }

    res.rawResponse += "<br>" + sum(1,2,3,5,9,80);

    return next();
}

module.exports = getHomeAction;