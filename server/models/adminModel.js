const { pool } = require('../db/db');

const getAdminByUsername = async (username) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM admin WHERE username = $1'; 
        const result = await client.query(query, [username]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

const getAdminById = async (admin_id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM admin WHERE admin_id = $1';
        const result = await client.query(query, [admin_id]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

const createAdmin = async (username, password, email) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO admin (username, password, email) VALUES ($1, $2, $3)';
        await client.query(query, [username, password, email]);
    } finally {
        client.release();
    }
};



const getAllAdmins = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM admin';
        const result = await client.query(query);
        return result.rows;
    } finally {
        client.release();
    }
};


const updateAdmin = async (admin_id, username, email) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE admin SET username = $2, email = $3 WHERE admin_id = $1';
        await client.query(query, [admin_id, username, email]);
    } finally {
        client.release();
    }
};


const deleteAdmins = async (admin_id) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM admin WHERE admin_id = $1';
        await client.query(query, [admin_id]);
    } finally {
        client.release();
    }
}

module.exports = {
    getAdminByUsername,
    createAdmin,
    deleteAdmins,
    updateAdmin,
    getAllAdmins,
    getAdminById
};
