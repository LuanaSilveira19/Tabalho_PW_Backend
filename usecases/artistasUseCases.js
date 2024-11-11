//Ele vai conter as consultas SQL para manipular a tabelas artistas.
const { pool } = require('../config');
const Artista = require('../entities/artistas')

const getArtistasDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM artistas ORDER BY nome');
        return rows.map((artista) => new Artista(artista.codigo, artista.nome, artista.genero_musical, artista.pais_origem));        
    } catch (err) {
        throw "Erro : " + err;
    }
}
const addArtistasDB = async (body) => {
    try {   
        const { nome, genero_musical, pais_origem } = body; 
        const results = await pool.query(`INSERT INTO artistas (nome, genero_musical, pais_origem ) 
            VALUES ($1, $2, $3)
            returning codigo, nome, genero_musical, pais_origem `,
        [nome, genero_musical, pais_origem]);
        const artista = results.rows[0];
        return new Artista(artista.codigo, artista.nome, artista.genero_musical, artista.pais_origem); 
    } catch (err) {
        throw "Erro ao inserir um artista: " + err;
    }    
}

const updateArtistasDB = async (body) => {
    try {   
        const { codigo, nome, genero_musical, pais_origem }  = body; 
        const results = await pool.query(`UPDATE artistas set nome = $2, genero_musical= $3, pais_origem= $4 where codigo = $1 
        returning codigo, nome, genero_musical, pais_origem`,
        [codigo, nome, genero_musical, pais_origem]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const artista = results.rows[0];
        return new Artista(artista.codigo, artista.nome, artista.genero_musical, artista.pais_origem); 
    } catch (err) {
        throw "Erro ao alterar o artista: " + err;
    }      
}

const deleteArtistasDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM artistas where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Artista removido(a) com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover um artista: " + err;
    }     
}

const getArtistaPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM artistas where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const artista = results.rows[0];
            return new Artista(artista.codigo, artista.nome, artista.genero_musical, artista.pais_origem); 
        }       
    } catch (err) {
        throw "Erro ao recuperar o artista: " + err;
    }     
}



module.exports = {
    getArtistasDB, addArtistasDB, updateArtistasDB,  deleteArtistasDB, getArtistaPorCodigoDB
}
