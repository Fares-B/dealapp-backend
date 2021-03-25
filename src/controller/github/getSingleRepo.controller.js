const axios = require('axios');

const apiGithubToken = "29b6a31c3b97ebbb93d05eb0825fa732864f7f76";

function listOrgRepos(req, res, next) {
    const options = {
        method: 'GET',
        url: `https://api.github.com/orgs/${req.params.owner}/${req.params.name}`,
        headers: { Authorization: 'token ' + apiGithubToken }
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
        res.rawResponse = response.data;
    }).catch(function (error) {
        console.error(error);
        res.rawResponse = error;
    }).then(() => next());
}

module.exports = listOrgRepos;