const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("stone_paper_scissors", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("postgres database connected successfully.."))
  .catch((error) => console.log(error));

sequelize.sync({ alter: true });

module.exports = sequelize;
