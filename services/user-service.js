const UserDao = require('../dao/user-dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const secretKey = config.get("secretKey");

class UserService {

    static async register(req, res) {
        let newUser = req.body.user;
        newUser.password = bcrypt.hashSync(newUser.password, 8);
        let oldUser;

        try {
            oldUser = await UserDao.getUserByUserName(newUser.userName);
        }
        catch(error) {
            res.status(500).send(error.message);
        }

        if(oldUser) {
            res.status(500).send("User already exists");
            return;
        }

        newUser = await UserDao.addUser(newUser);
        newUser.password = undefined;
        res.status(201).send(newUser);
    }; 

    static async login (req,res) {
        let attemptingUser = req.body.user;
        let user;
        
        try {
            user = await UserDao.getUserByUserName(attemptingUser.userName);
        }
        catch(error) {
            res.status(500).send(error.message);
        }

        if (!user) {
            res.status(500).send(attemptingUser.userName);
            return;
        } 

        let passwordIsValid = bcrypt.compareSync(attemptingUser.password, user.password);
        if (!passwordIsValid) {
            res.status(500).send("Wrong password");
            return;
        }

        const token = jwt.sign({
            userName: attemptingUser.userName, 
            expiresInMinutes : 1440 //24h
        }, secretKey);

        res.status(200).send({token});
    };

}

module.exports = UserService;