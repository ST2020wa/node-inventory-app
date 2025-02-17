const { Pool } = require("pg");
require('dotenv').config(); // Load environment variables from .env file

// First database connection
const pool = new Pool({
  host: process.env.DB_HOST, // Use environment variable for DB1
  user: process.env.DB_USER, // Use environment variable for DB1
  database: process.env.DB_NAME, // Use environment variable for DB1
  password: process.env.DB_PASSWORD, // Use environment variable for DB1
  port: process.env.DB_PORT, // Use environment variable for DB1
});

module.exports = { pool }; // Export both pools