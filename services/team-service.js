const TeamDao = require('../dao/team-dao');
const UserTeamDao = require('../dao/userTeam-dao');
const config = require('config');

class TeamService {

    static async createTeam(req, res) {
        let newTeam = req.body.team;
        if(!newTeam || !newTeam.teamName) {
            res.status(500).send("New team data not found in body");
            return;
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
        let teamId = req.query.id;
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

    static async getTeams(req, res) {
        let teamList;
        try {
            teamList = await TeamDao.getTeams();
        } 
        catch(error) {
            res.status(500).send(error.message);
        }
        res.status(200).send(teamList);
    }

    static async updateTeam(req, res) {
        let updateTeamId = req.query.id;
        let newTeam = req.body.newTeam;

        if(!updateTeamId || !newTeam) {
            res.status(500).send("Team id or params not found in request");
        }

        let updatedTeam;
        try {
            updatedTeam = await TeamDao.updateTeamProperties(updateTeamId, newTeam);
        }
        catch(error) {
            res.status(500).send(error.message);
        }

        res.status(200).send(updatedTeam);
    }

    static async getTeamMembers(req, res) {
        let usersTeamList = await UserTeamDao.getByTeamId(req.query.id);
        let team = await TeamDao.getTeamById(req.query.id);

        console.log({
            team: team,
            members: usersTeamList
        })

        res.status(200).send({
            team: team,
            members: usersTeamList
        });
    }

}

module.exports = TeamService;
