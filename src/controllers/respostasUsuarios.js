const respostasUsuariosModels = require("../database/models/respostaUsuario");

module.exports = class respostasUsuarios{
  static all(req, res, next) {
    respostasUsuariosModels.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }

    static async create(idCampanha, idUsuario, idPergunta, respostaUsuario) {
        try{
            const create = await respostasUsuariosModels.create({
                idCampanha,
                idUsuario,
                idPergunta,
                respostaUsuario
            })
            return create;
        }catch(err){
            return err;
        }
    }
};