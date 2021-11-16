const Usuarios = require("../database/models/usuarios");

module.exports = class jogo{
  static all(req, res, next) {
    Usuarios.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }

  static create(req, res, next) {
    const { nome, email, empresa, categoria } = req.body;

    Usuarios.create({
      nome,
      email,
      empresa,
      categoria
    })
      .then((result) => {
        res.status(201).json(result); //return with ID -> 201 (CREATED)
      })
      .catch(next);
  }

  static async findByPK(id) {
    try{
    const response = await Usuarios.findByPk(id)
    return response
    }catch(err){
      return err;
    }
}

static async findByEmpresaCategoria(empresa, categoria){
    const response = await Usuarios.findAll({
      where: {
        empresa,
        categoria
      }
  });
  return response;

}



};