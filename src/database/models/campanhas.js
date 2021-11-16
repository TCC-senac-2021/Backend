const { DataTypes } = require("sequelize");

const sequelize = require("../index");

const Campanhas = sequelize.define("campanhas", { 
    id: {
      type: DataTypes.INTEGER ,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,        
    },
    nomeDaCampanha: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    primeiroCupom: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    segundoCupom:{
      type: DataTypes.STRING(30),
    },
    terceiroCupom:{
      type: DataTypes.STRING(30),
    },
    tituloEmail :{
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    textoEmail :{
        type: DataTypes.STRING(3000),
        allowNull: false,
    },
  });

//create table if not exists...
const init = async () => {
  await Campanhas.sync();
};

init();

module.exports = Campanhas;