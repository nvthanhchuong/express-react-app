const UserService = require('../../services/userServices');

exports.createUser = async (req, res) => {

    const { full_name, email, password, re_password, phone } = req.body;

    try {
        // Gọi service để tạo mới người dùng
        await UserService.createUser(full_name, email, password, re_password, phone);
        
        res.status(201).json({ 
            success: true,
            message: 'Đăng ký tài khoản thành công !'
         });
    } catch (error) {
        if (error.message) {
            // Trả về lỗi nếu người dùng đã tồn tại
            res.status(400).json({ message: error.message });
        } else {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Kiểm tra thông tin đăng nhập
        const user = await UserService.loginUser(email, password);

        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ user });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(401).json({ error: error.message });
    }
};


exports.getCountAllUsers = async (req, res) => {
    try {
        // Kiểm tra thông tin đăng nhập
        const userCount = await UserService.getCountAllUsers();

        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ userCount });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

exports.getAllUsers = async (req, res) =>{
    try {
        // Kiểm tra thông tin đăng nhập
        const userData = await UserService.getAllUsers();

        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ user: userData });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

exports.deleteUsers = async (req, res) =>{
    const id = req.params.id;

    try {
        // Kiểm tra thông tin đăng nhập
        await UserService.deleteUsers(id);

        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ success: true, message: "Xoá sinh viên thành công !" });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}


exports.updateUser = async (req, res) => {
    const { id, full_name, email, phone } = req.body;
    try {
        await UserService.updateUser(id, full_name, email, phone);
        res.status(200).json({ success: true, message: 'Cập nhật sinh viên thành công !' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating user' });
    }
};


