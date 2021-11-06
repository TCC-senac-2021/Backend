const { request } = require('express');
const perguntas = require('./perguntas');

module.exports = class jogo{
    static async envioPergunta(req, res){
        const {id} = req.body;
        try{
            const response = await perguntas.findByPK(id);
            return res.send({
            "idPergunta": response.id,
            "textoPergunta": response.textoPergunta,
            "alternativa1": response.alternativa1,
            "alternativa2": response.alternativa2,
            "alternativa3": response.alternativa3,
            "alternativa4": response.alternativa4
        })
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
}