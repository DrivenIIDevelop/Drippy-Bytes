const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'projectpulse',
  password: 'Onelove198317$$##',
  port: 5432,
});

module.exports = pool;
