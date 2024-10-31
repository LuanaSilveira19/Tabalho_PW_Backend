//Ele vai ser responsável criar as rotas para os endpoints da api, associando uma rotas e um verbo do HTTP a execução de um método.
const { Router } = require('express');

const { getArtistas, addArtistas, updateArtistas, deleteArtistas, getArtistaPorCodigo} = require('../controllers/artistasController');

const rotasArtistas = new Router();

rotasArtistas.route('/artistas')
   .get(getArtistas)
   .post(addArtistas)
   .put(updateArtistas)

rotasArtistas.route('/artistas/:codigo')
   .get(getArtistaPorCodigo)
   .delete(deleteArtistas)

module.exports = { rotasArtistas };