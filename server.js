const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const auth          = require('./src/middlewares/auth.middleware');
const rateLimit     = require('./src/middlewares/rateLimi.middleware');
const serialization = require('./src/middlewares/serialization.middleware');

const getHome       = require('./src/controller/getHome.controller');
const getSum        = require('./src/controller/getSum.controller');
const listOrgRepos  = require('./src/controller/github/listOrgRepos.controller');
const getSingleRepo = require('./src/controller/github/getSingleRepo.controller');
const updateRepo    = require('./src/controller/github/updateRepo.controller');

const app   = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", auth, rateLimit, getHome, serialization);

app.get("/sum", auth, rateLimit, getSum, (req, res) => res.json(res.rawResponse) );

app.get("/github/:org", listOrgRepos, serialization);

app.get("/github/:owner/:repo", getSingleRepo, serialization);

app.patch("/github/:owner/:repo", updateRepo, serialization);

app.listen(process.env.PORT, () => console.log("server started") );
