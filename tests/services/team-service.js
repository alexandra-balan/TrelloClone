const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Team-service", function() {

    let TeamDao;
    let TeamService;
    let dummyTeam;
    let stubbedRes;
    this.timeout(10000);

    beforeEach(() => {
        dummyTeam = {
            teamName: "dummyTeamName",
            description: "dummyDescription"
        }
        TeamDao = ({
            addTeam: sinon.stub(),
            getTeamById: sinon.stub(),
            updateTeamProperties: sinon.stub()
        })
        stubbedRes = {
            send: sinon.stub(),
            status: sinon.stub()
        }
        TeamService = proxyquire('../../services/team-service', {
            '../dao/team-dao': TeamDao
        })
    })

    describe("createTeam", () => {
        it("should resolve if TeamDao.addTeam resolves", async () => {
            TeamDao.addTeam.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            return assert.isFulfilled(TeamService.createTeam({
                body: {
                    team: dummyTeam
                }
            }, stubbedRes));
        })

        it("should call res.status(500) if TeamDao.addTeam rejects", async () => {
            TeamDao.addTeam.rejects();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await TeamService.createTeam({
                body: {
                    team: dummyTeam
                }
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if teamName not found", async () => {
            TeamDao.addTeam.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await TeamService.createTeam({
                body: {
                    team: {}
                }
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if team not found", async () => {
            TeamDao.addTeam.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await TeamService.createTeam({
                body: {}
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })
    })

    describe("getTeam", () => {
        it("should resolve if TeamDao.getTeamById resolves", async () => {
            TeamDao.getTeamById.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            return assert.isFulfilled(TeamService.getTeam({
                params: {
                    id: 1
                }
            }, stubbedRes));
        })

        it("should call res.status(500) if TeamDao.getTeamById rejects", async () => {
            TeamDao.getTeamById.rejects();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await TeamService.getTeam({
                params: {
                    id: 1
                }
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if teamId not found", async () => {
            TeamDao.getTeamById.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await TeamService.getTeam({
                params: {}
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })
    })

    describe("updateTeam", () => {
        it("should resolve if TeamDao.updateTeamProperties resolves", async () => {
            TeamDao.updateTeamProperties.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            return assert.isFulfilled(TeamService.updateTeam({
                params: {
                    id: 1
                },
                body: {
                    team: dummyTeam
                }
            }, stubbedRes));
        })

        it("should call res.status(500) if TeamDao.updateTeamProperties rejects", async () => {
            TeamDao.updateTeamProperties.rejects();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await TeamService.updateTeam({
                params: {
                    id: 1
                },
                body: {
                    team: dummyTeam
                }
            }, stubbedRes);
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if teamId not found", async () => {
            TeamDao.updateTeamProperties.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await TeamService.updateTeam({
                params: {},
                body: {
                    team: dummyTeam
                }
            }, stubbedRes);
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if updateParams not found", async () => {
            TeamDao.updateTeamProperties.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await TeamService.updateTeam({
                params: {
                    id: 1
                },
                body: {}
            }, stubbedRes);
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })
    })

});