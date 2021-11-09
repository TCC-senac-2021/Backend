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

  static async perguntasCampanha(campanha) {
    const response = await Perguntas.findAll({
      attributes: ['id', 'numeroPergunta','textoPergunta', 'alternativa1', 'alternativa2', 'alternativa3', 'alternativa4'],
      where: {
        idCampanha: campanha
      }
    });
    return response;
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