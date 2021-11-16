const nodemailers = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
const CampanhaController = require('./campanhas');
const UsuariosController = require('./usuarios');

module.exports = class envioEmail{
    static async envio(req, res){
        const { nomeDaCampanha, empresa, categoria} = req.body;

        const clintes = await UsuariosController.findByEmpresaCategoria(empresa, categoria);
        const campanha = await CampanhaController.findByName(nomeDaCampanha);

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

        for(var key in clintes){
            var textoEmail = campanha.textoEmail.replace("{variavel usuario}", clintes[key].nome);
            textoEmail = textoEmail.replace("{variavel cliente}", clintes[key].empresa);
            textoEmail = textoEmail.replace("{variavel link}", `https://converta-quizz.netlify.app/?id=${clintes[key].id}&campanha=${campanha.nomeDaCampanha}`);
            var envio = await transporter.sendMail({
                from: process.env.USEREMAIL,
                to: clintes[key].email,
                subject: campanha.tituloEmail,
                text: "",
                html: textoEmail
            });
            console.log(envio)
        }

        return res.send(envio);
    }

}