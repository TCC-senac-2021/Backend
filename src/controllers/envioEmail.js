const nodemailers = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');

module.exports = class envioEmail{
    static async envio(req, res){
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

        const envio = await transporter.sendMail({
            from: process.env.USEREMAIL,
            to: "felipe.friedrich1996@gmail.com",
            subject: "Olá, Seja bem vindo",
            text: 'Olá, enviando um e-mail com o arquivo .env'
        });
        return res.send(envio);
    }

}