//Ele vai ser responsável criar as rotas para os endpoints da api, associando uma rotas e um verbo do HTTP a execução de um método.
const { Router } = require('express');

const { getArtistas, addArtistas, updateArtistas, deleteArtistas, getArtistaPorCodigo} = require('../controllers/artistasController');
const { verificaJWT } = require('../controllers/segurancaController')
const rotasArtistas = new Router();

rotasArtistas.route('/artistas')
   .get(getArtistas)
   .post(verificaJWT,addArtistas)
   .put(verificaJWT,updateArtistas)

rotasArtistas.route('/artistas/:codigo')
   .get(verificaJWT,getArtistaPorCodigo)
   .delete(verificaJWT,deleteArtistas)

module.exports = { rotasArtistas };