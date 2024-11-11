const { getMusicasDB, addMusicasDB, deleteMusicasDB, getMusicasPorCodigoDB, updateMusicasDB } = require('../usecases/musicasUseCases')

const getMusicas = async (request, response) => {
    await getMusicasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar a musica: ' + err
        }));
}
const addMusicas = async (request, response) => {
    await addMusicasDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Musica com sucesso!", //adiciona mas não mostra a mensagem
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteMusicas = async (request, response) => {
    await deleteMusicasDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getMusicasPorCodigo= async (request, response) => {
    await getMusicasPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

const updateMusicas = async (request, response) => {
    await updateMusicasDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Musica alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getMusicas, addMusicas, deleteMusicas, getMusicasPorCodigo, updateMusicas
}