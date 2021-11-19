const { request } = require('express');
const perguntas = require('./perguntas');
const campanhas = require('./campanhas');
const usuarios = require('./usuarios');

module.exports = class jogo{
    static async envioPergunta(req, res){
        const {campanha} = req.params;
        try{
            console.log(campanha)
            const id = await campanhas.findByNameReturnId(campanha);
            console.log(id);
            const response = await perguntas.perguntasCampanha(id);
            return res.status(200).send(response)
        }catch(err){
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

        var cupom = `${usuario.dataValues.nome}Senac2021${usuario.dataValues.id}`

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

    static async iniciaJogo(req, res){
        try{
            const { id } = req.params;        
            const usuario = await usuarios.findByPK(id);
            res.status(200).send(usuario)
        }catch(err){

        }
        
    }
}