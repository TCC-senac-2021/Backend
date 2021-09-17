const  routes  = require('express').Router();


routes.get('/', (request, response) => { return response.json('Funcionando') });


module.exports = routes;