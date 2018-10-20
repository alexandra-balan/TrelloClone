const config = require("config");
const TemplateDBHelper = require("./dbhelper/TemplateDBHelper");

console.log(JSON.stringify(config.get("dbConnectionArgs")));
console.log("Will try to execute sql query...");
TemplateDBHelper.getUserByIdExaple(1);