const axios = require('axios');

const apiGithubToken = process.env.GITHUB_TOKEN;

function listOrgRepos(req, res, next) {

    axios.get(`${process.env.GITHUB_API_URL}/orgs/${req.params.org}/repos`, {
        headers: { Authorization: 'token ' + apiGithubToken }
    })
    .then(function (response) {
        res.rawResponse = response.data;
    })
    .catch(function (error) {
        res.rawResponse = error;
    })
    .then(()=> next());
}

module.exports = listOrgRepos;
