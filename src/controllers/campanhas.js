const Campanhas = require("../database/models/campanhas");

module.exports =  class pergunta{
   static all(req, res, next) {
      Campanhas.findAll()
        .then((result) => {
          res.json(result);
        })
        .catch(next);
    }
    static create(req, res, next) {
      const { nomeDaCampanha, primeiroCupom, segundoCupom, terceiroCupom,tituloEmail,textoEmail} = req.body;
  
      Campanhas.create({
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
    }

    static async findByPK(id) {
      
      const response = await Campanhas.findByPk(id)
      return response
  }


  };