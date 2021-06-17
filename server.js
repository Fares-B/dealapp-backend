const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

let IN_PROD = true;
const SESSION_LIFETIME = 1000 * 60 * 60;

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    IN_PROD = false;
}


const connectDB = require('./src/middlewares/db.middleware');

// middlewares
const auth = require('./src/middlewares/auth.middleware');
const serialization = require('./src/middlewares/serialization.middleware');


// controller


const signup = require('./src/controller/users/signup.controller');
const login = require('./src/controller/users/login.controller');
const logout = require('./src/controller/users/logout.controller');
const usernameValid = require('./src/controller/users/usernameValid.controller');
const getUser = require('./src/controller/users/getUser.controller');


const newDeal = require('./src/controller/deal/newDeal.controller');
const getDeal = require('./src/controller/deal/getDeal.controller');
const getAllDeals = require('./src/controller/deal/getAllDeals.controller');

const getVotes = require('./src/controller/votes/getVotes.controller')
const newVote = require('./src/controller/votes/newVote.controller');

const newComment = require('./src/controller/comment/newComment.controller');
const getDealComments = require('./src/controller/comment/getDealComments.controller');
const getUserComments = require('./src/controller/comment/getUserComments.controller');

const newGroup = require('./src/controller/group/newGroup.controller');
const getGroups = require('./src/controller/group/getGroups.controller');
const getGroup = require('./src/controller/group/getGroup.controller');

// ADMIN
const authAdmin = require('./src/middlewares/authAdmin.middleware');
const getAllUsers = require('./src/controller/admin/users/getAllUsers.controller');


const app = express();

connectDB();

app.use(bodyParser.json());

app.use(cors({origin: [
        "http://localhost:3000"
    ], credentials: true}));

app.use(session({
    name: process.env.SESSION_NAME,
    secret: 'this is secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: SESSION_LIFETIME,
        // sameSite: true,
        secure: IN_PROD
    }
}));

app.get('/connected', (req, res, next) => {
    const { user } = req.session;
    if (!user) {
        return res.json({name: false, img: "https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png"});
    }
    return res.json({name: user.name, img: "https://img-premium.flaticon.com/png/512/3770/3770458.png?token=exp=1621602178~hmac=3eb56a9942468b34f47023241373e966"});
});

// USERS
app.post('/register', signup, serialization);

app.post('/login', login, serialization);

app.get('/logout', auth, logout, serialization);

app.post('/users/username/valid', usernameValid, serialization);

app.get('/user/:userId', getUser, serialization);


// DEALS
app.post('/deal/new', auth, newDeal, serialization);

app.get('/deal/:id', getDeal, serialization);

app.get('/deals', getAllDeals, serialization);

// VOTES

app.get('/deal/:id/votes', getVotes, serialization);

app.post('/deal/:id/vote', auth, newVote, serialization);


//COMMENTS
app.post('/deal/:id/comment/new', auth, newComment, serialization);

app.get('/deal/:id/comments', getDealComments, serialization);

app.get('/user/:id/comments', getUserComments, serialization);

// GROUPS
app.get('/groups', getGroups, serialization);

app.get('/group/:groupId', getGroup, serialization);

app.post('/group/new', newGroup, serialization);


// ADMIN
app.get('/admin/users', auth, authAdmin, getAllUsers, serialization);


app.listen(process.env.PORT, () => console.log("server started") );
