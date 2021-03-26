const github = require('../../services/github.service');

module.exports = async function updateRepo(req, res, next) {
    res.rawResponse = await github.patch(`/repos/${req.params.owner}/${req.params.repo}`, {
        description: req.body.description,
        private: req.body.private
    });

    return next();
}
