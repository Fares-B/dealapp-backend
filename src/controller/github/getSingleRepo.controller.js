const github = require('../../services/github.service');

module.exports = async function getSingleRepo(req, res, next) {
    res.rawResponse = await github.get(`/repos/${req.params.owner}/${req.params.repo}`);

    return next();
}
