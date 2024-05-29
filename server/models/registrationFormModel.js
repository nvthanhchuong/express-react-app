const { pool } = require('../db/db');

const findRegistrationFormById = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM registration_form WHERE id = $1';
        const result = await client.query(query, [id]);
        return result.rows;
    } finally {
        client.release();
    }
};

const findRegistrationFormByEmail = async (email) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM registration_form WHERE email = $1';
        const result = await client.query(query, [email]);
        return result.rows;
    } finally {
        client.release();
    }
};

const findRegistrationFormByPhone = async (phone) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM registration_form WHERE so_dien_thoai = $1';
        const result = await client.query(query, [phone]);
        return result.rows;
    } finally {
        client.release();
    }
};

const getCountRegistrationFormByStatus = async (status) => {
    const client = await pool.connect();

    try {
        const query = 'SELECT COUNT(*) FROM registration_form WHERE status = $1';
        const result = await client.query(query, [status]);
        // Lấy ra số lượng người dùng từ kết quả truy vấn
        const count = result.rows[0].count;
        return count; // Trả về số lượng người dùng
    } finally {
        client.release();
    }
}

const getCountRegistrationForm = async () => {
    const client = await pool.connect();

    try {
        const query = 'SELECT COUNT(*) FROM registration_form';
        const result = await client.query(query);
        // Lấy ra số lượng người dùng từ kết quả truy vấn
        const count = result.rows[0].count;
        return count; // Trả về số lượng người dùng
    } finally {
        client.release();
    }
}

const createRegistrationForm = async (formData) => {
    const client = await pool.connect();
    try {
        const {
            ho_va_ten,
            so_cccd,
            ngay_sinh,
            gioi_tinh,
            ho_khau_thuong_tru,
            dan_toc,
            ho_khau_tinh,
            ho_khau_huyen,
            noi_hoc_THPT_10,
            noi_hoc_THPT_11,
            noi_hoc_THPT_12,
            truong_hoc_10,
            truong_hoc_11,
            truong_hoc_12,
            nam_tot_nghiep_THPT,
            so_bao_danh,
            he_dao_tao,
            nganh_dao_tao,
            phuong_thuc_xet_tuyen,
            hoc_luc_12,
            hanh_kiem_ca_nam,
            thuoc_khu_vuc,
            thuoc_doi_tuong_uu_tien,
            dia_chi_bao_tin_khi_trung_tuyen,
            so_dien_thoai,
            email
        } = formData;


        const query = `INSERT INTO registration_form (ho_va_ten, so_cccd, ngay_sinh, gioi_tinh, ho_khau_thuong_tru, dan_toc, ho_khau_tinh, ho_khau_huyen, noi_hoc_THPT_10, noi_hoc_THPT_11, noi_hoc_THPT_12,
             truong_hoc_10, truong_hoc_11, truong_hoc_12, nam_tot_nghiep_THPT, so_bao_danh, he_dao_tao, nganh_dao_tao, phuong_thuc_xet_tuyen, hoc_luc_12, hanh_kiem_ca_nam, thuoc_khu_vuc, thuoc_doi_tuong_uu_tien, 
             dia_chi_bao_tin_khi_trung_tuyen, so_dien_thoai, email, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)`;

        await client.query(query, [
            ho_va_ten,
            so_cccd,
            ngay_sinh,
            gioi_tinh,
            ho_khau_thuong_tru,
            dan_toc,
            ho_khau_tinh,
            ho_khau_huyen,
            noi_hoc_THPT_10,
            noi_hoc_THPT_11,
            noi_hoc_THPT_12,
            truong_hoc_10,
            truong_hoc_11,
            truong_hoc_12,
            nam_tot_nghiep_THPT,
            so_bao_danh,
            he_dao_tao,
            nganh_dao_tao,
            phuong_thuc_xet_tuyen,
            hoc_luc_12,
            hanh_kiem_ca_nam,
            thuoc_khu_vuc,
            thuoc_doi_tuong_uu_tien,
            dia_chi_bao_tin_khi_trung_tuyen,
            so_dien_thoai,
            email,
            0
        ]);
    } finally {
        client.release();
    }
};

const getAllRegistrationsFrom = async () => {
    const client = await pool.connect();

    try {
        const query = 'SELECT * FROM registration_form WHERE status = 0';
        const result = await client.query(query);
        return result.rows;
    } finally {
        client.release();
    }
}

const getRegistrationsFromByStatus = async (status) => {
    const client = await pool.connect();

    try {
        const query = 'SELECT * FROM registration_form WHERE status = $1';
        const result = await client.query(query, [status]);
        return result.rows;
    } finally {
        client.release();
    }
}


const updateRegistrationsFrom = async (id, status) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE registration_form SET status = $2 WHERE id = $1';
        await client.query(query, [id, status]);
    } finally {
        client.release();
    }
};


module.exports = {
    findRegistrationFormByEmail,
    findRegistrationFormByPhone,
    createRegistrationForm,
    getCountRegistrationFormByStatus,
    getAllRegistrationsFrom,
    updateRegistrationsFrom,
    findRegistrationFormById,
    getRegistrationsFromByStatus,
    getCountRegistrationForm
 }
