const sequelize = require('../database/index');
const campanhas = require('./campanhas');

module.exports = class dadosJogos{
    static async dadosEntradaUsuario(req, res){
        const { nomeCampanha } = req.params;
        try{
        const campanha = await campanhas.findByName(nomeCampanha);
        const response = await sequelize.query(`SELECT
        u."nome",
        u."email",
        e."createdAt"
            FROM
                "usuarios" u
            INNER JOIN "entradaUsuarios" e 
                ON u."id" = e."idUsuario"
            INNER JOIN "campanhas" c
                ON e."idCampanha" = c."id"
                where e."idCampanha" = ${campanha.id}
            ORDER BY u.id;`);
        res.send(response[0])
        }catch(err){
            res.status(500).send(err);
        }
    }

    static async dadosEnvioDeEmail(req, res){
        const { nomeCampanha } = req.params;
        try{
        const campanha = await campanhas.findByName(nomeCampanha);
        const response = await sequelize.query(`SELECT
                                                e."email",
                                                e."acceptedOrReject",
                                                e."createdAt"
                                                FROM
                                                "envioEmails" e 
                                                INNER JOIN "campanhas" c
                                                    ON e."idCampanha" = c."id"
                                                    where e."idCampanha" = ${campanha.id}
                                                ORDER BY e.id;`);
        res.send(response[0])
        }catch(err){
            res.status(500).send(err);
        }
    }


    static async dadosUsuarios(req, res){
        const { nomeCampanha } = req.params;
        var acertos = 0, erros = 0;
        try{
        const campanha = await campanhas.findByName(nomeCampanha);
        const response = await sequelize.query(`select DISTINCT(u."id"), u."nome", u."email", ca."cupomGanho" , e."createdAt" HorarioEmailEnviado  from
                                                "campanhas" c
                                                inner join 
                                                "campanhaAtivas" ca
                                                on c."id" = ca."idCampanha"
                                                inner join 
                                                "usuarios" u
                                                on u."id" = ca."idUsuario"
                                                inner join 
                                                "envioEmails" e
                                                on c."id" = e."idCampanha" and e."email" = u."email"
                                                where c."id" = ${campanha.id}
                                                order by u."id"`);
        
        var resultados = response[0];
        for(var key in resultados){
            const responseAcertos = await sequelize.query(`select count(u."id") from 
                                                            "respostasUsuarios" ru
                                                            inner join "perguntas" p
                                                            on p."resposta" = ru."respostaUsuario"
                                                            inner join "campanhas" c
                                                            on c."id" = ru."idCampanha"
                                                            inner join "usuarios" u
                                                            on u."id" = ru."idUsuario"
                                                            where c."id" = ${campanha.id} and
                                                            u."id" = ${resultados[key].id}`);
        
        if(responseAcertos[0][0].count > 4){
            responseAcertos[0][0].count = 4;
        }else{
            responseAcertos[0][0].count = parseInt(responseAcertos[0][0].count);
        }
        resultados[key].acertos = responseAcertos[0][0].count;
            
            
        }
        res.status(200).send(resultados);
        }catch(err){
            res.status(500).send(err);
        }
    }

    static async dadosNumeroAcertosPorPergunta(req, res){
        const { nomeCampanha, numeroPergunta } = req.params;
        var acertos = 0, erros = 0;
        try{
        const campanha = await campanhas.findByName(nomeCampanha);
        const response = await sequelize.query(`SELECT
                                                    u."nome",
                                                    p."numeroPergunta",
                                                    p."textoPergunta",
                                                    r."respostaUsuario",
                                                    p."resposta"
                                                    
                                                FROM
                                                "respostasUsuarios" r 
                                                INNER JOIN "perguntas" p
                                                    ON p."id" = r."idPergunta"
                                                    INNER JOIN "usuarios" u
                                                    ON u."id" = r."idUsuario"
                                                    where r."idCampanha" = ${campanha.id} and
                                                    p."numeroPergunta" = ${numeroPergunta}
                                                ORDER BY r.id;`);
        var resultados = response[0];
        for(var key in resultados){
            
            if(resultados[key].respostaUsuario == resultados[key].resposta){
                acertos++;
            }else{
                erros++;
            }
            
        }
        res.send({acertos,erros});

        }catch(err){
            res.status(500).send(err);
        }
    }
};