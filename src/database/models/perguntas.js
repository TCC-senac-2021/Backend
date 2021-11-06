const { DataTypes } = require("sequelize");

const sequelize = require("../index");

const Perguntas = sequelize.define("perguntas", { 
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
    numeroPergunta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    textoPergunta:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternativa1 :{
        type: DataTypes.STRING,
        allowNull: false,
      },
    alternativa2 :{
        type: DataTypes.STRING,
        allowNull: false,
    },
    alternativa3:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    alternativa4:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  resposta:{
    type: DataTypes.STRING,
    allowNull: false,
  },

  });

//create table if not exists...
const init = async () => {
  await Perguntas.sync();
};

init();

module.exports = Perguntas;