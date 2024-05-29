const AdminService = require('../../services/adminServices');

exports.createAdmin = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Gọi service để tạo mới người quản trị
        await AdminService.createAdmin(username, password, email);

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        if (error.message === 'User already exists') {
            // Trả về lỗi nếu người dùng đã tồn tại
            res.status(400).json({ error: 'User already exists' });
        } else {
            console.error('Error creating admin:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


exports.getAllAdmins = async (req, res) =>{
    try {
        // Kiểm tra thông tin đăng nhập
        const adminData = await AdminService.getAllAdmins();

        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ admin: adminData });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

exports.deleteAdmins = async (req, res) =>{
    const admin_id = req.params.admin_id;

    try {
        // Kiểm tra thông tin đăng nhập
        await AdminService.deleteAdmins(admin_id);

        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ success: true, message: "Xoá quản trị viên thành công !" });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}


exports.updateAdmin = async (req, res) => {
    const { admin_id, username, email } = req.body;
    try {
        await AdminService.updateAdmin(admin_id, username, email);
        res.status(200).json({ success: true, message: 'Cập nhật quản trị viên thành công !' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating user' });
    }
};
