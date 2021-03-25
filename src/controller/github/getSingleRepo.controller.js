const axios = require('axios');

const apiGithubToken = process.env.GITHUB_TOKEN;

function getSingleRepo(req, res, next) {

    axios.get(`${process.env.GITHUB_API_URL}/repos/${req.params.owner}/${req.params.name}`, {
        headers: { Authorization: 'token ' + apiGithubToken }
    })
    .then(function (response) {
        res.rawResponse = response.data;
    })
    .catch(function (error) {
        res.rawResponse = error;
    })
    .then(() => next());
}

module.exports = getSingleRepo;
