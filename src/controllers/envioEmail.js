const nodemailers = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
const CampanhaController = require('./campanhas');
const UsuariosController = require('./usuarios');
const envioEmailBD = require("../database/models/envioEmail");

module.exports = class envioEmail{


    static async envio(req, res){
        const { nomeDaCampanha, empresa, categoria} = req.body;

        const clientes = await UsuariosController.findByEmpresaCategoria(empresa, categoria);
        const campanha = await CampanhaController.findByName(nomeDaCampanha);

        //gerando a campanha
        const campanhaAtiva = await CampanhaController.gerarCampanhaAtiva(campanha.id, clientes);
        
        let acceptedEmails = [];
        let rejectedEmails = [];
        const transporter = nodemailers.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure:false,
            auth: {
                user: process.env.USEREMAIL,
                pass: process.env.SENHAEMAIL

            },
            tls :{
            rejectUnathorized:false,
        }});

        for(var key in clientes){
            var textoEmail = campanha.textoEmail.replace("{variavel usuario}", clientes[key].nome);
            textoEmail = textoEmail.replace("{variavel cliente}", clientes[key].empresa);
            textoEmail = textoEmail.replace("{variavel link}", `https://converta-quizz.netlify.app/?id=${clientes[key].id}&campanha=${campanha.nomeDaCampanha}`);
            try{
            var envio = await transporter.sendMail({
                from: process.env.USEREMAIL,
                to: clientes[key].email,
                subject: campanha.tituloEmail,
                text: "",
                html: textoEmail
            });
            }catch(err){
                envio.accepted = "";
                envio.rejected =  [ clientes[key].email ]; 
                console.log(err);
            }
           
            if(envio.accepted.length > 0){
                var acceptedOrReject = "accepted";
            }else{
                var acceptedOrReject = "reject";
            }

            try{
                await envioEmailBD.create({
                    'idCampanha': campanha.id,
                    'email': clientes[key].email,
                    acceptedOrReject
                });
            }catch(err){
                console.log(err);
            }
        }

        return res.send(envio);
    }

}