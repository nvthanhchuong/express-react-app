const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Định nghĩa hàm createUser
const createUser = async (full_name, email, password, re_password, phone) => {
    // Check if all required fields are provided
    if (!full_name || !email || !password || !re_password || !phone) {
        throw new Error('Vui lòng điền đầy đủ thông tin.');
    }

    // Kiểm tra xem người dùng đã tồn tại hay chưa
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
        throw new Error('Sinh viên đã tồn tại !');
    }

    if (password !== re_password) {
        throw new Error('Mật khẩu không trùng khớp');
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Gọi model để tạo mới người quản trị
    await UserModel.createUser(full_name, email, hashedPassword, phone);
};


const loginUser = async (email, password) => {
     // Kiểm tra xem email và password có giá trị không
     if (!email || !password) {
        throw new Error('Vui lòng nhập email và mật khẩu');
    }

    // Tìm người dùng trong cơ sở dữ liệu bằng username
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
        throw new Error('Người dùng không tồn tại !');
    }

    // So sánh mật khẩu đã nhập với mật khẩu trong cơ sở dữ liệu
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Địa chỉ email hoặc mật khẩu không chính xác !');
    }

    return user;
};

const getCountAllUsers = async () => {
    const userCount = UserModel.getCountAllUsers();
    return userCount;
}

const getAllUsers = async () =>{
    return await UserModel.getAllUsers();
}


const deleteUsers = async (id) => {
    const userExist = await UserModel.getUserById(id);
    if (!userExist) {
        throw new Error('Không tìm thấy người dùng này !');
    }
    return await UserModel.deleteUsers(id);
}

const updateUser = async (id, full_name, email, phone) => {
    try {
        await UserModel.updateUser(id, full_name, email, phone);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};





// Xuất hàm createUser
module.exports = { createUser, loginUser, getCountAllUsers, getAllUsers, deleteUsers, updateUser };
