const AdminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');

// Định nghĩa hàm createAdmin
const createAdmin = async (username, password, email) => {
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    const existingUser = await AdminModel.getAdminByUsername(username);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Gọi model để tạo mới người quản trị
    await AdminModel.createAdmin(username, hashedPassword, email);
};

const getAllAdmins = async () =>{
    return await AdminModel.getAllAdmins();
}


const deleteAdmins = async (admin_id) => {


    const userExist = await AdminModel.getAdminById(admin_id);

    if (!userExist) {
        throw new Error('Không tìm thấy quản trị viên này !');
    }
    return await AdminModel.deleteAdmins(admin_id);
}

const updateAdmin = async (admin_id, username, email) => {
    try {
        await AdminModel.updateAdmin(admin_id, username, email);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Xuất hàm createAdmin
module.exports = { createAdmin, deleteAdmins, updateAdmin, getAllAdmins };
