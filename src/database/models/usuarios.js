const { DataTypes } = require("sequelize");

const sequelize = require("../index");

const Users = sequelize.define("usuarios", { 
    id: {
      type: DataTypes.INTEGER ,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,        
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empresa:{
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    categoria:{
      type: DataTypes.STRING(50),
    },
  });

//create table if not exists...
const init = async () => {
  await Users.sync();
};

init();

module.exports = Users;