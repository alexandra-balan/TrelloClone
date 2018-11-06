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

    static async updateTeamProperties(id, properties) {
        let team;
        let updatePropertiesMap = {};
        if(properties.teamName) {
            updatePropertiesMap.teamName = properties.teamName;
        }
        if(properties.description) {
            updatePropertiesMap.description = properties.description;
        }

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