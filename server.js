const express = require('express');
const bodyParser = require('body-parser');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// /emojis
const auth          = require('./src/middlewars/auth.middlewar');
const rateLimit     = require('./src/middlewars/rateLimi.middlewart');
const serialization = require('./src/middlewars/serialization.middlewar');

const getHome       = require('./src/controller/getHome.controller');
const getSum        = require('./src/controller/getSum.controller');
const listOrgRepos  = require('./src/controller/github/listOrgRepos.controller');
const getSingleRepo = require('./src/controller/github/getSingleRepo.controller');
const updateRepo    = require('./src/controller/github/updateRepo.controller');

const app   = express();
const port  = 3000;

app.use(bodyParser.json());

app.get("/", auth, rateLimit, getHome, serialization);

app.get("/sum", auth, rateLimit, getSum, (req, res) => res.json(res.rawResponse) );

app.get("/github/:org", listOrgRepos, serialization);

app.get("/github/:owner/:name", getSingleRepo, serialization);

app.patch("/github/:owner/:name", updateRepo, serialization);

app.listen(port, () => console.log("Le serveur est lancé dans le port 3000.") );
