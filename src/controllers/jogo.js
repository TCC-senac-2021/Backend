const { request } = require('express');
const perguntas = require('./perguntas');
const campanhas = require('./campanhas');
const usuarios = require('./usuarios');
const respostasUsuarios = require('./respostasUsuarios');
const entradaUsuario = require('./entradaUsuario');


module.exports = class jogo{
    static async envioPergunta(req, res){
        const {campanha} = req.params;
        try{
            const id = await campanhas.findByNameReturnId(campanha);
            const response = await perguntas.perguntasCampanha(id);
            return res.status(200).send(response)
        }catch(err){
            return res.send(err);
        }
        

    }

    static async conferePergunta(req, res){
        const { id, resposta, idUsuario, nomeCampanha } = req.body;

        try{
            const responseCampanha = await campanhas.findByName(nomeCampanha);

            try{
                await respostasUsuarios.create(responseCampanha.id, idUsuario, id , resposta);
            }catch(err){
                console.log(err);
            }
            const requestBanco = await perguntas.findByPK(id);
            if(requestBanco.resposta == resposta){
                return res.status(200).send(true);
            }

            return res.status(200).send(false);

        }catch(err){
            return res.status(400).send(err);
        }
        
    }

    static async enviaCupom(req, res){
        
        try{
        const {id, nomeCampanha, nroAcertos} = req.body;
        const campanha = await campanhas.findByName(nomeCampanha);
        const usuario = await usuarios.findByPK(id);
        const white_spaces = RegExp("(\\s+)", "gi")
        var nomeUsuario = usuario.dataValues.nome.replace(white_spaces, "");

        var cupom = `${nomeUsuario}Senac2021${usuario.dataValues.id}`
        if(nroAcertos == 2){
            cupom = `${nomeUsuario}${campanha.dataValues.terceiroCupom}${usuario.dataValues.id}`
        }else if(nroAcertos == 3){
            cupom = `${nomeUsuario}${campanha.dataValues.segundoCupom}${usuario.dataValues.id}`
        }else if(nroAcertos == 4){
            cupom = `${nomeUsuario}${campanha.dataValues.primeiroCupom}${usuario.dataValues.id}`
        }

        try{
            await campanhas.updateCupomCampanhaAtiva(cupom, usuario.dataValues.id, campanha.dataValues.id);
        }catch(err){
            console.log(err);
        }
        
        return res.status(200).send(cupom);
        }catch(err){
            return res.status(400).send(err);
        }
    }

    static async iniciaJogo(req, res){
        try{
            const { id, nomeCampanha} = req.body;
            const responseCampanha = await campanhas.findByName(nomeCampanha);        
            const usuario = await usuarios.findByPK(id);
            try{
                await entradaUsuario.create(id, responseCampanha.id);
            }catch(err){
                console.log(err);
            }
            res.status(200).send(usuario)
        }catch(err){

        }
        
    }
}