const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserService = require('./services/user-service');
const TeamService = require('./services/team-service');
const UserTeamService = require('./services/userTeam-service');
const config = require('config');

const app = express();
const router = express.Router();
const db = mongoose.connection;
const dbUrl = config.get("dbConnectionArgs").dbUrl;
const conErr = config.get("appMessages").connError;
const appPort = config.get("appPort");
const sererStartMessage = config.get("appMessages").serverStart;
const jwt = require('jsonwebtoken');
const secretKey = config.get("secretKey");


const JWTMiddleware = (req, res, next) => {

    let JWToken;
    let cleanToken;

    try {
        JWToken = req.headers.authorization;
        cleanToken = JWToken.replace('Bearer ', '');
    } 
    catch(error)
    {
        res.status(401).send("Not authorized");
    }
  
    jwt.verify(cleanToken, secretKey, (err, isValid) => {
        if(!isValid) {
            res.status(401).send("Not authorized");
        } else {
            next();
        }
    });
};


app.use(bodyParser.json());
app.use('/api', router);

mongoose.connect(dbUrl);
db.on('error', console.error.bind(console, conErr));

router.post('/register', UserService.register);
router.post('/login', UserService.login);

router.post('/team', JWTMiddleware, TeamService.createTeam);
router.put('/team/:id?', JWTMiddleware, TeamService.updateTeam);
router.get('/team/:id?', JWTMiddleware, TeamService.getTeam);

router.get('/userTeam/:teamId?/:userId?', JWTMiddleware, UserTeamService.getTeamUser);
router.post('/userTeam', JWTMiddleware, UserTeamService.getTeamUser);

const server = app.listen(appPort, () => console.log(sererStartMessage, appPort));
module.exports = server;