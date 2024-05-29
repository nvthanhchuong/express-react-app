require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
});

const connectDB = async () => {
    try {
        await pool.query('SELECT NOW()'); // Simple query to test connection
        console.log('PostgreSQL connected successfully!');
    } catch (error) {
        console.error('PostgreSQL connection error:', error);
        process.exit(1); // Exit process on connection failure
    }
};

module.exports = { connectDB, pool };
