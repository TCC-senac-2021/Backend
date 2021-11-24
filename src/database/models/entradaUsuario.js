const { DataTypes } = require("sequelize");

const sequelize = require("../index");

const entradaUsuario = sequelize.define("entradaUsuario", { 
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
    }
});

//create table if not exists...
const init = async () => {
  await entradaUsuario.sync();
};

init();

module.exports = entradaUsuario;