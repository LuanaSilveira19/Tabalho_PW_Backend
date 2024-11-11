const { Router } = require('express');

const { getAlbuns, addAlbuns, deleteAlbuns,updateAlbuns,getAlbunsPorCodigo} = require('../controllers/albunsControllers');

const rotasAlbuns = new Router();

rotasAlbuns.route('/albuns')
   .get(getAlbuns)
   .post(addAlbuns)//está funcionando mas não aparece a mensagem
   .put(updateAlbuns)

rotasAlbuns.route('/albuns/:codigo')
   .delete(deleteAlbuns)//do banco de dados ele remove, mas se remover 2 siguidos ele aparece mensagem de erro mas remove mesmo assim, //é problema do postman
   .get(getAlbunsPorCodigo)
module.exports = { rotasAlbuns };