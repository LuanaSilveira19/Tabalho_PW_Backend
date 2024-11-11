const { getAlbunsDB,addAlbunsDB, deleteAlbunsDB, updateAlbunsDB, getAlbunsPorCodigoDB} = require('../usecases/albunsUseCases')

const getAlbuns = async (request, response) => {
    await getAlbunsDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os albuns: ' + err
        }));
}

const addAlbuns= async (request, response) => {
    await addAlbunsDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Álbum adicionado com sucesso!",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao adicionar o álbum: ' +err
        }));
}

const deleteAlbuns = async (request, response) => {
    await deleteAlbunsDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao deletar o álbum: ' +err
        }));        
}
const updateAlbuns = async (request, response) => {
    await updateAlbunsDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Álbum modificado com sucesso!",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao modificar o álbum: ' +err
        }));
}


const getAlbunsPorCodigo= async (request, response) => {
    await getAlbunsPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao procurar o álbum: ' +err
        }));           
}

module.exports = {
    getAlbuns, addAlbuns,deleteAlbuns, updateAlbuns,getAlbunsPorCodigo
}