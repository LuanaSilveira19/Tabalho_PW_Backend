const { Router } = require('express');

const { getMusicas,addMusicas, deleteMusicas, getMusicasPorCodigo, updateMusicas} = require('../controllers/musicasControllers');

const rotasMusicas = new Router();

rotasMusicas.route('/musicas')
   .get(getMusicas)
   .post(addMusicas)
   .put(updateMusicas)//fez mas não mostrou a mensagem

rotasMusicas.route('/musicas/:codigo')
   .get(getMusicasPorCodigo)
   .delete(deleteMusicas)
  

module.exports = { rotasMusicas };