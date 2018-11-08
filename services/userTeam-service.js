const UserTeamDao = require('../dao/userTeam-dao');

class UserTeamService {

    static async createUserTeam(req, res) {
        let newUserTeam = req.body.userTeam;
        if(!newUserTeam || !newUserTeam.userId || !newUserTeam.teamId) {
            res.status(500).send("New user-team data not found in body");
        }

        try {
            newUserTeam = await UserTeamDao.addTeamUser(newUserTeam);
        } 
        catch(error) {
            res.status(500).send(error.message);
        }
        res.status(201).send(newUserTeam)
    }

    static async getTeamUser(req, res) {
        let userTeam;
        let {teamId} = req.params;
        let {userId} = req.params;
        if(!teamId || !userId) {
            res.status(500).send("User or team id not found in url");
        }

        try {
            userTeam = await UserTeamDao.getUserTeamById(teamId, userId);
        } 
        catch(error) {
            res.status(500).send(error.message);
        }
        res.status(200).send(userTeam);
    }

}

module.exports = UserTeamService;