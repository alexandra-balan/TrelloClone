const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("UserTeam-dao", function() {

    let UserTeam;
    let UserTeamDao;
    this.timeout(10000);

    beforeEach(() => {
        UserTeam = ({
            findOne: sinon.stub(),
            save: sinon.stub(),
        })
        UserTeamDao = proxyquire('../../dao/userTeam-dao', {
            '../models/user-team': UserTeam
        })
    })

    describe("getUserTeamById", () => {
        it("should resolve if UserTeam.findOne resolves", async () => {
            UserTeam.findOne.resolves();
            return assert.isFulfilled(UserTeamDao.getUserTeamById(1));
        })
    
        it("should reject if UserTeam.findOne rejects", async () => {
            UserTeam.findOne.rejects();
            return assert.isRejected(UserTeamDao.getUserTeamById(1));
        })  
    })

    describe("addUserTeam", () => {
        it("should reject if UserTeam.save rejects", async () => {
            UserTeam.save.rejects();
            return assert.isRejected(UserTeamDao.addUserTeam({}));
        })
    })

});