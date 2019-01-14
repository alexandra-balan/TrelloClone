const UserTeam = require("../models/user-team");

class UserTeamDao {

    static async getUserTeamById(teamId, userId) {
        let userTeam;
        try {
            userTeam = await UserTeam.findOne({userId, teamId});
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

    static async getByTeamId(teamId) {
        let userTeam;
        try {
            userTeam = await UserTeam.find({teamId}).populate("userId");
        }
        catch(error) {
            throw error;
        }

        return userTeam;
    }

    static async removeByTeamIdAndUserId(teamId, userId) {
        try {
            await UserTeam.deleteOne({
                userId: userId,
                teamId: teamId
            });
        }
        catch (e) {
            throw error;
        }
    }
}

module.exports = UserTeamDao;