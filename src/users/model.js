const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const User = connection.define(
  "User",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields:["userName", "email"] }] }
);

module.exports = User;
