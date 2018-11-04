const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/user');
const app = express();
const router = express.Router();

const db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/trello-schema');
db.on('error', console.error.bind(console, 'connection error:'));

const server = app.listen(3000, () => console.log('server started'));
module.exports = server;