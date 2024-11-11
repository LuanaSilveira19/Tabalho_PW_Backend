const { pool } = require('../config');
const Albuns = require('../entities/albuns')

const getAlbunsDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM albuns ORDER BY codigo');
        return rows.map((albuns) => new Albuns(albuns.codigo, albuns.titulo, albuns.ano_lancamento, albuns.pais_origem, albuns.artistas));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addAlbunsDB = async (body) => {
    try {   
        const { titulo, ano_lancamento, pais_origem, artistas} = body; 
        const results = await pool.query(`INSERT INTO albuns (titulo, ano_lancamento, pais_origem, artistas) 
            VALUES ($1, $2, $3, $4)
            returning codigo, titulo, ano_lancamento, pais_origem, artistas `,
        [titulo, ano_lancamento, pais_origem, artistas]);
        const albuns = results.rows[0];
        return new Albuns(albuns.codigo, albuns.titulo, albuns.ano_lancamento, albuns.pais_origem, albuns.artistas); 
    } catch (err) {
        throw "Erro ao inserir um albun: " + err;
    }    
}

const deleteAlbunsDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM albuns where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Album removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o album: " + err;
    }     
}
const updateAlbunsDB= async (body) => {
    try {   
        const { codigo, titulo, ano_lancamento, pais_origem, artistas}  = body; 
        const results = await pool.query(`UPDATE albuns set titulo = $2, ano_lancamento= $3, pais_origem= $4, artistas=$5 where codigo = $1 
        returning codigo, titulo, ano_lancamento, pais_origem, artistas`,
        [codigo, titulo, ano_lancamento, pais_origem, artistas]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const albuns = results.rows[0];
        return new Albuns(albuns.codigo, albuns.titulo, albuns.ano_lancamento, albuns.pais_origem, albuns.artistas); 
    } catch (err) {
        throw "Erro ao alterar o album: " + err;
    }      
}
const getAlbunsPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM albuns where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
        const albuns = results.rows[0];
        return new Albuns(albuns.codigo, albuns.titulo, albuns.ano_lancamento, albuns.pais_origem, albuns.artistas); 
        }       
    } catch (err) {
        throw "Erro ao recuperar o album: " + err;
    }     
}
module.exports = {
    getAlbunsDB, addAlbunsDB, deleteAlbunsDB, updateAlbunsDB, getAlbunsPorCodigoDB
}