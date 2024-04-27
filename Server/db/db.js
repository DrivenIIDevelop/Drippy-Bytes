const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'drippybytes',
  password: 'Onelove198317$$##',
  port: 5432,
});

module.exports = pool;
