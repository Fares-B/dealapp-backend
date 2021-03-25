const express = require('express');
const githubToken = "29b6a31c3b97ebbb93d05eb0825fa732864f7f76";
// /emojis
const auth          = require('./src/middlewars/auth.middlewar');
const rateLimit     = require('./src/middlewars/rateLimi.middlewart');
const serialization = require('./src/middlewars/serialization.middlewar');

const getHome       = require('./src/controller/getHome.controller');
const getSum        = require('./src/controller/getSum.controller');
const listOrgRepos  = require('./src/controller/github/listOrgRepos.controller');
const getSingleRepo = require('./src/controller/github/getSingleRepo.controller');

const app   = express();
const port  = 3000;

app.get("/", auth, rateLimit, getHome, serialization);

app.get("/sum", auth, rateLimit, getSum, (req, res) => res.json(res.rawResponse) );

app.get("/github/:org", listOrgRepos, serialization);

app.get("/github/:owner/:name", getSingleRepo, serialization);

app.listen(port, () => console.log("Le serveur est lancé dans le port 3000.") );
