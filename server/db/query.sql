CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE registration_form (
    id SERIAL PRIMARY KEY,
    ho_va_ten VARCHAR(255),
    so_cccd VARCHAR(20),
    ngay_sinh DATE,
    gioi_tinh VARCHAR(10),
    ho_khau_thuong_tru TEXT,
    dan_toc VARCHAR(50),
    ho_khau_tinh VARCHAR(50),
    ho_khau_huyen VARCHAR(50),
    noi_hoc_THPT_10 TEXT,
    noi_hoc_THPT_11 TEXT,
    noi_hoc_THPT_12 TEXT,
    truong_hoc_10 TEXT,
    truong_hoc_11 TEXT,
    truong_hoc_12 TEXT,
    nam_tot_nghiep_THPT INTEGER,
    so_bao_danh VARCHAR(20),
    he_dao_tao VARCHAR(50),
    nganh_dao_tao VARCHAR(255),
    phuong_thuc_xet_tuyen VARCHAR(100),
    hoc_luc_12 VARCHAR(20),
    hanh_kiem_ca_nam VARCHAR(20),
    thuoc_khu_vuc VARCHAR(50),
    thuoc_doi_tuong_uu_tien VARCHAR(100),
    dia_chi_bao_tin_khi_trung_tuyen TEXT,
    so_dien_thoai VARCHAR(15),
    email VARCHAR(255),
    status INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
