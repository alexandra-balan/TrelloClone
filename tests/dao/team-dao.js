const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Team-dao", function() {

    let Team;
    let TeamDao;
    let dummyTeam
    this.timeout(10000);

    beforeEach(() => {
        dummyTeam = {
            teamName: "dummyTeamName",
            description: "dummyTeamDescription"
        }
        Team = ({
            findOne: sinon.stub(),
            save: sinon.stub(),
            findByIdAndUpdate: sinon.stub()
        })
        TeamDao = proxyquire('../../dao/team-dao', {
            '../models/team': Team
        })
    });

    describe("getTeamById", () => {
        it("should resolve if Team.findOne resolves", async () => {
            Team.findOne.resolves();
            return assert.isFulfilled(TeamDao.getTeamById(1));
        })
    
        it("should reject if Team.findOne rejects", async () => {
            Team.findOne.rejects();
            return assert.isRejected(TeamDao.getTeamById(1));
        })
    });

    describe("updateTeamProperties", () => {
        it("should resolve if Team.findByIdAndUpdate resolves", async () => {
            Team.findByIdAndUpdate.resolves();
            return assert.isFulfilled(TeamDao.updateTeamProperties(1, dummyTeam));
        })
    
        it("should resolve if Team.findByIdAndUpdate rejects", async () => {
            Team.findByIdAndUpdate.rejects();
            return assert.isRejected(TeamDao.updateTeamProperties(1, dummyTeam));
        })
    });

    describe("addTeam", () => {
        it("should reject if Team.save rejects", async () => {
            Team.save.rejects();
            return assert.isRejected(TeamDao.addTeam({}));
        })
    })

});