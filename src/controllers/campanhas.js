const Campanhas = require("../database/models/campanhas");
const UsuariosController = require("./usuarios");
const CampanhaAtiva = require("../database/models/campanhaAtiva");

module.exports =  class campanha{
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

    static async findByName(nomeDaCampanha){
      try{
      const response = await Campanhas.findAll({
        where: {
          nomeDaCampanha
        }
      });
      return response[0];
    }catch(err){
      return err;
    }
    }

    static async findByNameReturnId(nomeDaCampanha){
      try{
      const response = await Campanhas.findAll({
        where: {
          nomeDaCampanha
        }
      });
      return response[0].dataValues.id;
    }catch(err){
      return err;
    }
    }

    static async gerarCampanhaAtiva(idCampanha, participantes){
      let qtdAdicionados = 0;
      let qtdNaoAdicionados = 0;
      for(const key in participantes){
        var idUsuario = participantes[key].dataValues.id
        try{
        const jacriado = await CampanhaAtiva.findAll({
          where: {
            idCampanha,
            idUsuario
          }
        });
        if(jacriado.length != 0){
          qtdNaoAdicionados++
        }
        if(jacriado.length == 0){
          CampanhaAtiva.create({
            idCampanha,
            idUsuario
            })
          qtdAdicionados++;
        }

        
        }catch(err){
        }
      }
      return("Campanha Criada, idCampanha "+ idCampanha + " \n Total de usuários adicionados: "+ qtdAdicionados + " \n Total de usuários não adicionados: "+ qtdNaoAdicionados);

    }

    static async verificaUsuarioPossuiCupom(idUsuario, idCampanha){
      try{
        const response = await CampanhaAtiva.findAll({
          where: {
            idUsuario,
            idCampanha
          }
        });
        if(response[0].cupomGanho){
          return response[0].cupomGanho;
        }
        return "";
        
      }catch(err){
        return err;
      }
    }

    static async updateCupomCampanhaAtiva(cupom, idUsuario, idCampanha){
      try{
        const response = await CampanhaAtiva.update(
          {'cupomGanho': cupom},
          {where: {idUsuario, idCampanha}});
          return response;
      }catch(err){
        return err;
      }

    }
  };