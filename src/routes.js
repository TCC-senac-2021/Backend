const  routes  = require('express').Router();
const envioEmailControllers = require('./controllers/envioEmail');
const usuarios = require('./controllers/usuarios');
const campanhas = require('./controllers/campanhas');
const perguntas = require('./controllers/perguntas');
const jogo = require("./controllers/jogo");


routes.get('/', (request, response) => { return response.json('Funcionando') });

routes.post ('/sendEmail', envioEmailControllers.envio);

routes.post ('/criarUsuario', usuarios.create);
routes.post('/criarcampanha', campanhas.create);
routes.post('/criarPergunta', perguntas.create);
routes.post('/gerarCampanhaAtiva',campanhas.gerarCampanhaAtiva);

routes.get('/enviopergunta/:campanha', jogo.envioPergunta);
routes.post('/conferePergunta', jogo.conferePergunta);
routes.post('/enviaCupom', jogo.enviaCupom);
routes.post('/start', jogo.iniciaJogo);

module.exports = routes;