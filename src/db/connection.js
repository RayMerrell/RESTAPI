const { Sequelize } = require("sequelize");
console.log("-----------Getting a new connection--------------");
const connection = new Sequelize(process.env.CONNECTION);
connection.authenticate();
console.log("DB Connection established");
module.exports = connection;