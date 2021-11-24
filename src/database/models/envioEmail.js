const { DataTypes } = require("sequelize");

const sequelize = require("../index");

const envioEmail = sequelize.define("envioEmail", { 
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    acceptedOrReject:{
      type: DataTypes.STRING(8),
      allowNull: false,
    }
  });

//create table if not exists...
const init = async () => {
  await envioEmail.sync();
};

init();

module.exports = envioEmail;