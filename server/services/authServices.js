const AdminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');

const loginAdmin = async (username, password) => {
     // Kiểm tra xem username và password có giá trị không
     if (!username || !password) {
        throw new Error('Username and password are required');
    }

    // Tìm người dùng trong cơ sở dữ liệu bằng username
    const admin = await AdminModel.getAdminByUsername(username);
    if (!admin) {
        throw new Error('Invalid username or password');
    }

    // So sánh mật khẩu đã nhập với mật khẩu trong cơ sở dữ liệu
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
        throw new Error('Invalid username or password');
    }

    return admin;
};

module.exports = { loginAdmin };
