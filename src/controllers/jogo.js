const { request } = require('express');
const perguntas = require('./perguntas');
const campanhas = require('./campanhas');
const usuarios = require('./usuarios');

module.exports = class jogo{
    static async envioPergunta(req, res){
        const {idCampanha} = req.body;
        try{
            const response = await perguntas.perguntasCampanha(idCampanha);
            return res.status(200).send(response)
        }catch(err){
            console.log('AQUI')
            return res.send(err);
        }
        

    }

    static async conferePergunta(req, res){
        const { id, resposta } = req.body;

        const requestBanco = await perguntas.findByPK(id);

        if(requestBanco.resposta == resposta){
            return res.status(200).send(true);
        }

        return res.status(200).send(false);
    }

    static async enviaCupom(req, res){
        
        try{
        const {id, nomeCampanha, nroAcertos} = req.body;
        const campanha = await campanhas.findByName(nomeCampanha);
        const usuario = await usuarios.findByPK(id);

        var cupom = "semCupom"

        if(nroAcertos == 2){
            cupom = `${usuario.dataValues.nome}${campanha.dataValues.terceiroCupom}${usuario.dataValues.id}`
        }else if(nroAcertos == 3){
            cupom = `${usuario.dataValues.nome}${campanha.dataValues.segundoCupom}${usuario.dataValues.id}`
        }else if(nroAcertos == 4){
            cupom = `${usuario.dataValues.nome}${campanha.dataValues.primeiroCupom}${usuario.dataValues.id}`
        }
        
        return res.status(200).send(cupom);
        }catch(err){
            return res.status(400).send(err);
        }
    }
}