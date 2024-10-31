const { getAlbunsDB,addAlbunsDB, deleteAlbunsDB, updateAlbunsDB, getAlbunsPorCodigoDB} = require('../usecases/albunsUseCases')

const getAlbuns = async (request, response) => {
    await getAlbunsDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os albuns: ' + err
        }));
}

const addAlbuns = async (request, response) => {
    await addAlbunsDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Album criado", //esta criano certo no BD mas não mostra a mensagem no postman
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteAlbuns = async (request, response) => {
    await deleteAlbunsDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}
const updateAlbuns = async (request, response) => {
    await updateAlbunsDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Album modificado com sucesso!",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getAlbunsPorCodigo= async (request, response) => {
    await getAlbunsPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getAlbuns, addAlbuns,deleteAlbuns, updateAlbuns,getAlbunsPorCodigo
}