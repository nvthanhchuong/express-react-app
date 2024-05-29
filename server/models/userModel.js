const { pool } = require('../db/db');

const getUserByEmail = async (email) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await client.query(query, [email]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

const getUserById = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await client.query(query, [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

const getAllUsers = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM users';
        const result = await client.query(query);
        return result.rows;
    } finally {
        client.release();
    }
};

const createUser = async (full_name, email, password, phone) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO users (full_name, email, password, phone) VALUES ($1, $2, $3, $4)';
        await client.query(query, [full_name, email, password, phone]);
    } finally {
        client.release();
    }
};

const updateUser = async (id, full_name, email, phone) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE users SET full_name = $2, email = $3, phone = $4 WHERE id = $1';
        await client.query(query, [id, full_name, email, phone]);
    } finally {
        client.release();
    }
};


const getCountAllUsers = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT COUNT(*) FROM users';
        const result = await client.query(query);
        // Lấy ra số lượng người dùng từ kết quả truy vấn
        const count = result.rows[0].count;
        return count; // Trả về số lượng người dùng
    } finally {
        client.release();
    }
}

const deleteUsers = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM users WHERE id = $1';
        await client.query(query, [id]);
    } finally {
        client.release();
    }
}




module.exports = {
    getUserByEmail,
    createUser,
    getCountAllUsers,
    getAllUsers,
    getUserById,
    deleteUsers,
    updateUser
};
