//. Ele vai ser responsável por tratar as requisições e respostas HTTP.
const { getArtistasDB, addArtistasDB, updateArtistasDB, deleteArtistasDB, getArtistaPorCodigoDB} = require('../usecases/artistasUseCases')

const getArtistas = async (request, response) => {
    await getArtistasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os artistas: ' + err
        }));
}

const addArtistas = async (request, response) => {
    await addArtistasDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Arista criado(a) com sucesso!",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateArtistas = async (request, response) => {
    await updateArtistasDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Arista modificado(a) com sucesso!",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteArtistas = async (request, response) => {
    await deleteArtistasDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getArtistaPorCodigo= async (request, response) => {
    await getArtistaPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getArtistas,  addArtistas, updateArtistas, deleteArtistas, getArtistaPorCodigo
}
