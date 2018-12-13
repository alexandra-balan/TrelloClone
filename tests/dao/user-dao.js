const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("User-dao", function() {

    let User;
    let UserDao;
    this.timeout(10000);

    beforeEach(() => {
        User = ({
            findOne: sinon.stub(),
            save: sinon.stub(),
        })
        UserDao = proxyquire('../../dao/user-dao', {
            '../models/user': User
        })
    })

    describe("getUserByUserName", () => {
        it("should resolve if User.findOne resolves", async () => {
            User.findOne.resolves();
            return assert.isFulfilled(UserDao.getUserByUserName(1));
        })
    
        it("should reject if User.findOne rejects", async () => {
            User.findOne.rejects();
            return assert.isRejected(UserDao.getUserByUserName(1));
        })  
    })

    describe("addUser", () => {
        it("should reject if User.save rejects", async () => {
            User.save.rejects();
            return assert.isRejected(UserDao.addUser({}));
        })
    })

});