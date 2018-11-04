const UserDao = require('../dao/user-dao');

class UserService {

    static async register(req, res) {
        let newUser = req.body.user;
        let oldUser = await UserDao.getUserByUserName(newUser.userName);

        if(oldUser) {
            res.status(500).send("User already exists");
            return;
        }

        newUser = await UserDao.addUser(newUser);
        res.status(201).send(newUser);
    };

}

module.exports = UserService;