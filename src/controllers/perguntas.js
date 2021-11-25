const Perguntas = require("../database/models/perguntas");

module.exports = class pergunta{
    static async all() {
      const response = await Perguntas.findAll();
      return response;
    }

     static async findByPK(id) {
      
      const response = await Perguntas.findByPk(id)
      return response
  }

  static async perguntasCampanha(idCampanha) {

    var perguntas = [];
    
    for(var i = 0; i < 4; i++){
    const response = await Perguntas.findAll({
      attributes: ['id', 'numeroPergunta','textoPergunta', 'alternativa1', 'alternativa2', 'alternativa3', 'alternativa4'],
      where: {
        idCampanha,
        'numeroPergunta': i + 1
      }
    });
      perguntas[i] = response[0];
    }


    return perguntas;
  }

   static async create(req, res, next) {
    const { idCampanha, numeroPergunta, textoPergunta, alternativa1,alternativa2, alternativa3, alternativa4, resposta} = req.body;


    const response = await Perguntas.create({
      idCampanha,
      numeroPergunta,
      textoPergunta,
      alternativa1,
      alternativa2,
      alternativa3,
      alternativa4,
      resposta
      })
    
    return res.send(response);
  }
  };