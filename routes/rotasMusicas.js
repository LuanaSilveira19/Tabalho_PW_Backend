const { Router } = require('express');

const { getMusicas,addMusicas, deleteMusicas, getMusicasPorCodigo, updateMusicas} = require('../controllers/musicasControllers');
const { verificaJWT } = require('../controllers/segurancaController')
const rotasMusicas = new Router();

rotasMusicas.route('/musicas')
   .get(getMusicas)
   .post(verificaJWT,addMusicas)
   .put(verificaJWT,updateMusicas)//fez mas não mostrou a mensagem

rotasMusicas.route('/musicas/:codigo')
   .get(verificaJWT,getMusicasPorCodigo)
   .delete(verificaJWT,deleteMusicas)
  

module.exports = { rotasMusicas };