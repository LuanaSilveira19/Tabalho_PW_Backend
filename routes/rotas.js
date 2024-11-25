//Ele vai ser responsável por agrupar as todas as rotas da API
const { Router } = require('express');

const { rotasArtistas } = require('./rotasArtistas');
const { rotasAlbuns } = require('./rotasAlbuns');
const { rotasMusicas} = require('./rotasMusicas');
const { login } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasArtistas);
rotas.use(rotasAlbuns);
rotas.use(rotasMusicas);

// rota para fazer o login e pegar o JWT
rotas.route("/login")
     .post(login)           
	 
module.exports = rotas;