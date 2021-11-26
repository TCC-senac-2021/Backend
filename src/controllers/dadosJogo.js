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


    static async dadosRespostasUsuarios(req, res){
        const { nomeCampanha } = req.params;
        var acertos = 0, erros = 0;
        try{
        const campanha = await campanhas.findByName(nomeCampanha);
        const response = await sequelize.query(`SELECT
                                                u."nome",
                                                p."textoPergunta",
                                                r."respostaUsuario",
                                                p."resposta"
                                                
                                                FROM
                                                    "respostasUsuarios" r 
                                                INNER JOIN "perguntas" p
                                                    ON p."id" = r."idPergunta"
                                                    INNER JOIN "usuarios" u
                                                    ON u."id" = r."idUsuario"
                                                    where r."idCampanha" = ${campanha.id}
                                                ORDER BY r.id;`);
        
        res.send(response[0])
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