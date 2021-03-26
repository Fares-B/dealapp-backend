const axios = require('axios');

const github = axios.create({
    baseURL: process.env.GITHUB_API_URL,
    headers: {
        Authorization: 'token ' + process.env.GITHUB_TOKEN
    }
});

const get = path => github.get(path).then(response => response.data).catch(error => error.message);

const patch = (path, data) => github.patch(path, data).then(response => response.data).catch(error => error);

module.exports = { get, patch };
