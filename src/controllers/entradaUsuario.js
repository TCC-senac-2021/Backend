const entradaUsuarioModels = require("../database/models/entradaUsuario");

module.exports = class respostasUsuarios{
  static all(req, res, next) {
    entradaUsuarioModels.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }

    static async create(idUsuario, idCampanha) {
        try{
            const create = await entradaUsuarioModels.create({
                idCampanha,
                idUsuario,
            })
            return create;
        }catch(err){
            return err;
        }
    }
};