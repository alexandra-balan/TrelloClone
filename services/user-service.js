const UserDao = require('../dao/user-dao');

class UserService {

    static async register(req, res) {
        let hashedPwd = bcrypt.hashSync(req.body.password,8);
        let newUser = req.body.user;
        newUser.password = hashedPwd;
        let oldUser = await UserDao.getUserByUserName(newUser.userName);

        if(oldUser) {
            res.status(500).send("User already exists");
            return;
        }

        newUser = await UserDao.addUser(newUser);
        newUser.password = undefined; // nu cred ca mai e nevoie
        res.status(201).send(newUser);
    };

    static async login (req,res) {
        let username = req.body.userName;
        let user = await UserDao.getUserByUserName(username);
        let passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
        if (!user){
            res.status(500).send("User does not exist");
            return;
        }
        else if (!passwordIsValid){
            res.status(500).send("Wrong password ");
            return;
        }
        else if (username === user.userName && passwordIsValid){
            const token = jwt.sign({
                userName: username , 
                expiresInMinutes : 1440 //24h
            },secret);

            res.status(200).send(
                {
                    token : token, 
                     
                }
            );
        }
    
        
    };

}

module.exports = UserService;