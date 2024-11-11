//Ele contém as definições para conexão com o banco de dados localmente e na nuvem.
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production' //valor da variavel ambiente quando estiver em uma núvem

let pool = null;
if (isProduction) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL, ssl: {
      rejectUnauthorized: false,
    }
  })
} else {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Gravacoes_db',
    password: 'postgres',
    port: 5432
  })
}

module.exports = { pool }