const { Router } = require('express');

const { getAlbuns, addAlbuns, deleteAlbuns,updateAlbuns,getAlbunsPorCodigo} = require('../controllers/albunsControllers');
const { verificaJWT } = require('../controllers/segurancaController')
const rotasAlbuns = new Router();

rotasAlbuns.route('/albuns')
   .get(getAlbuns)
   .post(verificaJWT,addAlbuns)//está funcionando mas não aparece a mensagem
   .put(verificaJWT,updateAlbuns)

rotasAlbuns.route('/albuns/:codigo')
   .delete(verificaJWT,deleteAlbuns)//do banco de dados ele remove, mas se remover 2 siguidos ele aparece mensagem de erro mas remove mesmo assim, //é problema do postman
   .get(verificaJWT,getAlbunsPorCodigo)
module.exports = { rotasAlbuns };