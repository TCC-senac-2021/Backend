const { DataTypes } = require("sequelize");

const sequelize = require("../index");

const respostaUsuario = sequelize.define("respostasUsuarios", { 
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
    idPergunta:{
        type: DataTypes.INTEGER,
        references: {model: "perguntas", key: "id"},
        allowNull: false,
    },
    respostaUsuario:{
      type: DataTypes.STRING(30),
    }
  });

//create table if not exists...
const init = async () => {
  await respostaUsuario.sync();
};

init();

module.exports = respostaUsuario;