const Usuarios = require("../database/models/usuarios");

module.exports = {
  all(req, res, next) {
    Usuarios.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },
  create(req, res, next) {
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
  },
};