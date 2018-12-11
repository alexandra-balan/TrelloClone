const UserTeam = require("../models/user-team");

class UserTeamDao {

    static async getUserTeamById(teamId, userId) {
        let userTeam;
        try {
            userTeam = UserTeam.findOne({userId, teamId});
        }
        catch(error) {
            throw error;
        }

        return userTeam;
    }

    static async addUserTeam(userTeam) {
        let newUserTeam = UserTeam(userTeam);
        try {
            newUserTeam = await newUserTeam.save();
        }
        catch(error) {
            throw error;
        }

        return newUserTeam;
    }
}

module.exports = UserTeamDao;