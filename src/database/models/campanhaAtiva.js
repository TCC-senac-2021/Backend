const { DataTypes } = require("sequelize");

const sequelize = require("../index");

const campanhaAtiva = sequelize.define("campanhaAtiva", { 
    id: {
      type: DataTypes.INTEGER ,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,        
    },
    idCampanha: {
      type: DataTypes.INTEGER,
      references: {model: "campanhas", key: "id"},
      allowNull: false,
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        references: {model: "usuarios", key: "id"},
        allowNull: false,
    },
    cupomGanho:{
        type: DataTypes.STRING
    }

  });

//create table if not exists...
const init = async () => {
  await campanhaAtiva.sync();
};

init();

module.exports = campanhaAtiva;