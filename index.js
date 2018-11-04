const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserService = require('./services/user-service');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const app = express();
const router = express.Router();
const db = mongoose.connection;
const dbUrl = config.get("dbConnectionArgs").dbUrl;
const conErr = config.get("appMessages").connError;
const appPort = config.get("appPort");
const sererStartMessage = config.get("appMessages").serverStart;

const secret = "theSecret";

app.use(bodyParser.json());
app.use('/api', router);

mongoose.connect(dbUrl);
db.on('error', console.error.bind(console, conErr));

router.post('/register', UserService.register);
router.post('/login',UserService.login);

const server = app.listen(appPort, () => console.log(sererStartMessage, appPort));
module.exports = server;