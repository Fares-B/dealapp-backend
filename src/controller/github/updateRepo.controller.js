const axios = require('axios');

const apiGithubToken = process.env.GITHUB_TOKEN;

function updateRepo(req, res, next) {

    axios.request(`${process.env.GITHUB_API_URL}/repos/${req.params.owner}/${req.params.name}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'token ' + apiGithubToken
        },
        data: {
            description: req.body.description,
            private: req.body.private
        }
    })
    .then(function (response) {
        res.rawResponse = response.data;
    })
    .catch(function (error) {
        res.rawResponse = error;
    })
    .then(() => next());

}

module.exports = updateRepo;
