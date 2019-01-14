const User = require('../models/user');

class UserDao {

    static async getUserByUserName(userName) {
        let user;
        try {
            user = await User.findOne({userName});
        }
        catch(error) {
            throw error;
        }
        return user;
    }

    static async addUser(user) {
        let newUser = new User(user);
        try {
            newUser = await newUser.save();
        }
        catch(error) {
            throw error;
        }

        return newUser;
    }

}

module.exports = UserDao;