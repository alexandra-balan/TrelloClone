const TeamDao = require('../dao/team-dao');
const config = require('config');

class TeamService {

    static async createTeam(req, res) {
        let newTeam = req.body.team;
        if(!newTeam || !newTeam.teamName) {
            res.status(500).send("New team data not found in body");
        }

        try {
            newTeam = await TeamDao.addTeam(newTeam);
        } 
        catch(error) {
            res.status(500).send(error.message);
        }
        res.status(201).send(newTeam)
    }

    static async getTeam(req, res) {
        let team;
        let teamId = req.params.id;
        if(!teamId) {
            res.status(500).send("Team id not found in url");
        }

        try {
            team = await TeamDao.getTeamById(teamId);
        } 
        catch(error) {
            res.status(500).send(error.message);
        }
        res.status(200).send(team);
    }

    static async updateTeam(req, res) {
        let updateTeamId = req.params.id;
        let updateParams = req.body.updateParams;
        console.log("HATER")
        console.log(updateParams);
        let updatedTeam;
        try {
            updatedTeam = await TeamDao.updateTeamProperties(updateTeamId, updateParams);
        }
        catch(error) {
            res.status(500).send(error.message);
        }

        res.status(200).send(updatedTeam);
    }

}

module.exports = TeamService;
