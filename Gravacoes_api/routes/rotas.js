//Ele vai ser responsável por agrupar as todas as rotas da API
const { Router } = require('express');

const { rotasArtistas } = require('./rotasArtistas');
const { rotasAlbuns } = require('./rotasAlbuns');
const { rotasMusicas} = require('./rotasMusicas');

const rotas = new Router();

rotas.use(rotasArtistas);
rotas.use(rotasAlbuns);
rotas.use(rotasMusicas);

module.exports = rotas;