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
        const {id, idCampanha, cupomGanho} = req.body;
        const campanha = await campanhas.findByPK(idCampanha);
        const usuario = await usuarios.findByPK(id);
        const cupom = "semCupom"

        if(cupomGanho == 3){
            cupom = `${usuario.nome}${campanha.terceiroCupom}${usuario.id}`
        }else if(cupomGanho == 2){
            cupom = `${usuario.nome}${campanha.segundoCupom}${usuario.id}`
        }else if(cupomGanho == 1){
            cupom = `${usuario.nome}${campanha.primeiroCupom}${usuario.id}`
        }

        return res.status(200).send(cupom);
        }catch(err){
            return res.status(400).send(err);
        }
    }
}