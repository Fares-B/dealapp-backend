const github = require('../../services/github.service');

module.exports = async function listOrgRepos(req, res, next) {
    res.rawResponse = await github.get(`/orgs/${req.params.org}/repos`);

    return next();
}
