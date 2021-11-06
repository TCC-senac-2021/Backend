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
      type: DataTypes.STRING,
      allowNull: false,
    },
    primeiroCupom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundoCupom:{
      type: DataTypes.STRING,
    },
    terceiroCupom:{
      type: DataTypes.STRING,
    },
    tituloEmail :{
        type: DataTypes.STRING,
        allowNull: false,
      },
    textoEmail :{
        type: DataTypes.STRING,
        allowNull: false,
    },
  });

//create table if not exists...
const init = async () => {
  await Campanhas.sync();
};

init();

module.exports = Campanhas;