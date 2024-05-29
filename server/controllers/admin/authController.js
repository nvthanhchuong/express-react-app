const AuthService = require('../../services/authServices');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Kiểm tra thông tin đăng nhập
        const admin = await AuthService.loginAdmin(username, password);

        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ admin });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(401).json({ error: error.message });
    }
};
