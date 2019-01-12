const Team = require('../models/team');

class TeamDao {

    static async getTeamById(id) {
        let team;
        try {
            team = await Team.findOne({_id: id});
        }
        catch(error) {
            throw error;
        }

        return team;
    }

    static async getTeams() {
        let teamList;
        try {
            teamList = await Team.find({});
        }
        catch(error) {
            throw error;
        }

        return teamList;
    }

    static async addTeam(team) {
        let newTeam = new Team(team);
        try {
            newTeam = await newTeam.save();
        }
        catch(error) {
            throw error;
        }

        return newTeam;
    }

    static async updateTeamProperties(id, newTeam) {
        let team;
        let updatePropertiesMap = {};
        if(newTeam.teamName) {
            updatePropertiesMap.teamName = newTeam.teamName;
        }
        if(newTeam.description) {
            updatePropertiesMap.description = newTeam.description;
        }

        console.log(updatePropertiesMap);

        try {
            team = await Team.findByIdAndUpdate(id, updatePropertiesMap, {new:true});
        }
        catch(error) {
            throw error;
        }

        return team;
    }

}

module.exports = TeamDao;