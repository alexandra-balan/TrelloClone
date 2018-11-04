const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: String,
    description: String
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team