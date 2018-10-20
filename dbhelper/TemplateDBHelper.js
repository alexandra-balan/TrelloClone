const config = require("config");
const mysql = require("mysql");

class TemplateDBHelper {

    static getUserByIdExaple(id) {
        let connectionArgs = config.get("dbConnectionArgs");
        let con = mysql.createConnection(connectionArgs);
        let sql = "SELECT 1";

        con.connect( (err) => {
            if(err) {
                throw err;
            }
            console.log("Succesfully connected to DB");
            con.query(sql, (err, result) => {
                if(err) {
                    throw err;
                }
                console.log("Sql result: " + JSON.stringify(result));
            })
        })

    }

}

module.exports = TemplateDBHelper;