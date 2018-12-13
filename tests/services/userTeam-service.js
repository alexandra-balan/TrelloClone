const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Team-service", function() {

    let UserTeamDao;
    let UserTeamService;
    let dummyUserTeam;
    let stubbedRes;
    this.timeout(10000);

    beforeEach(() => {
        dummyUserTeam = {
            teamId: "1",
            userId: "2"
        }
        UserTeamDao = ({
            addUserTeam: sinon.stub(),
            getUserTeamById: sinon.stub()
        })
        stubbedRes = {
            send: sinon.stub(),
            status: sinon.stub()
        }
        UserTeamService = proxyquire('../../services/userTeam-service', {
            '../dao/userTeam-dao': UserTeamDao
        })
    })

    describe("createUserTeam", () => {
        it("should resolve if UserTeamDao.addUserTeam resolves", async () => {
            UserTeamDao.addUserTeam.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            return assert.isFulfilled(UserTeamService.createUserTeam({
                body: {
                    userTeam: dummyUserTeam
                }
            }, stubbedRes));
        })

        it("should reject if UserTeamDao.addUserTeam rejects", async () => {
            UserTeamDao.addUserTeam.rejects();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await UserTeamService.createUserTeam({
                body: {
                    userTeam: dummyUserTeam
                }
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if UserTeamDao.teamId not found in req", async () => {
            UserTeamDao.addUserTeam.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await UserTeamService.createUserTeam({
                body: {
                    userTeam: {
                        userId: 2
                    }
                }
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if userId not found", async () => {
            UserTeamDao.addUserTeam.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await  UserTeamService.createUserTeam({
                body: {
                    userTeam: {
                        teamId: 2
                    }
                }
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if team not found", async () => {
            UserTeamDao.addUserTeam.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await UserTeamService.createUserTeam({
                body: {}
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })
    })
    
    describe("getUserTeam", () => {
        it("should resolve if UserTeamDao.getUserTeamById resolves", async () => {
            UserTeamDao.getUserTeamById.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            return assert.isFulfilled(UserTeamService.getUserTeam({
                params: {
                    userId: 1,
                    teamId: 2
                }
            }, stubbedRes));
        })

        it("should call res.status(500) if UserTeamDao.getUserTeamById rejects", async () => {
            UserTeamDao.getUserTeamById.rejects();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await UserTeamService.getUserTeam({
                params: {
                    userId: 1,
                    teamId: 2
                }
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if userId not found", async () => {
            UserTeamDao.getUserTeamById.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await UserTeamService.getUserTeam({
                params: {
                    teamId: 1
                }
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })

        it("should call res.status(500) if teamId not found", async () => {
            UserTeamDao.getUserTeamById.resolves();
            stubbedRes.status.returns(stubbedRes);
            stubbedRes.send.returns();
            await UserTeamService.getUserTeam({
                params: {
                    userId: 2
                }
            }, stubbedRes)
            return sinon.assert.calledWith(stubbedRes.status, 500);
        })
    })

});