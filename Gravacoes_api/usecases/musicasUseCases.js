const { pool } = require('../config');
const Musica = require('../entities/musicas');

const getMusicasDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM musicas ORDER BY codigo');
        return rows.map((musica) => new Musica(musica.codigo, musica.titulo, musica.duracao, musica.albuns));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addMusicasDB = async (body) => {
    try {   
        const { titulo, duracao, albuns } = body; 
        const results = await pool.query(`INSERT INTO musicas (titulo, duracao, albuns) 
            VALUES ($1, $2, $3)
            returning codigo, titulo, duracao, albuns`,
        [titulo, duracao, albuns]);
        const musica = results.rows[0];
        return new Musica(musica.codigo, musica.titulo, musica.duracao, musica.albuns); 
    } catch (err) {
        throw "Erro ao inserir a musica: " + err;
    }    
}

const deleteMusicasDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM musicas where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Musica removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a musica: " + err;
    }     
}

const getMusicasPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM musicas where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const musica = results.rows[0];
            return new Musica(musica.codigo, musica.titulo, musica.duracao, musica.albuns); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a categoria: " + err;
    }     
}
const updateMusicasDB = async (body) => {
    try {   
        const { codigo,titulo, duracao, albuns}  = body; 
        const results = await pool.query(`UPDATE musicas set titulo = $2, duracao= $3, albuns= $4 where codigo = $1 
        returning codigo, titulo, duracao, albuns`,
        [codigo, titulo, duracao, albuns]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const musica = results.rows[0];
            return new Musica(musica.codigo, musica.titulo, musica.duracao, musica.albuns); 
    } catch (err) {
        throw "Erro ao alterar a musica: " + err;
    }      
}


module.exports = {
    getMusicasDB, addMusicasDB, deleteMusicasDB, getMusicasPorCodigoDB, updateMusicasDB
}