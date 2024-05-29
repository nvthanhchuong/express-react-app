const { message } = require('antd');
const registrationFormServices = require('../../services/registrationFormServices');

exports.createRegistrationForm = async (req, res) => {
    try {
        // Kiểm tra thông tin đăng nhập
        await registrationFormServices.createRegistrationForm(req.body.formData);
        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ message: "Nộp phiếu đăng ký thành công", success: true });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

exports.getCountRegistrationFormByStatus = async (req, res) => {
    try {
        // Kiểm tra thông tin đăng nhập
        const count = await registrationFormServices.getCountRegistrationFormByStatus(req.body.status);
        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ count: count });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

exports.getAllRegistrationsFrom = async (req, res) => {
    try {

        const allRegistrationsFrom  = await registrationFormServices.getAllRegistrationsFrom();
        res.status(200).json({ allRegistrationsFrom: allRegistrationsFrom });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

exports.updateRegistrationsFrom = async (req, res) => {
    try {
        const {id, status} = req.body;
        await registrationFormServices.updateRegistrationsFrom(id, status);
        res.status(200).json({ success: true, message: "Cập nhật trang thái phiếu đăng ký thành công !" });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

exports.getRegistrationsFromByStatus = async(req, res) => {
    try {
        const {status} = req.body;
        const formData = await registrationFormServices.getRegistrationsFromByStatus(status);
        res.status(200).json({ formData: formData });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

exports.getCountRegistrationForm = async(req, res) => {
    try {
        const countAllForm = await registrationFormServices.getCountRegistrationForm();
        res.status(200).json({ countAllForm: countAllForm });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}
