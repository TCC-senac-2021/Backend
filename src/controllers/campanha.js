const campanha = require("../database/models/campanhas");

module.exports = {
    all(req, res, next) {
        campanha.findAll()
        .then((result) => {
          res.json(result);
        })
        .catch(next);
    },
    create(req, res, next) {
      const { nomeDaCampanha, primeiroCupom, segundoCupom, terceiroCupom,tituloEmail,textoEmail} = req.body;
  
      campanha.create({
        nomeDaCampanha,
        primeiroCupom,
        segundoCupom,
        terceiroCupom,
        tituloEmail,
        textoEmail,
        })
        .then((result) => {
          res.status(201).json(result); //return with ID -> 201 (CREATED)
        })
        .catch(next);
    },
  };