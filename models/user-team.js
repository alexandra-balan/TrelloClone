const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTeamSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    userRole: String
});
userTeamSchema.index({ "userId": 1, "teamId": 1}, { "unique": true });

const UserTeam = mongoose.model('UserTeam', userTeamSchema);

module.exports = UserTeam