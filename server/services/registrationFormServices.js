const registrationFormModel = require ("../models/registrationFormModel");

const createRegistrationForm = async (formData) => {
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


     // Kiểm tra xem tất cả các trường đã được điền đầy đủ
     if (!ho_va_ten || !so_cccd || !ngay_sinh || !gioi_tinh || !ho_khau_thuong_tru || !dan_toc || !ho_khau_tinh || !ho_khau_huyen || !noi_hoc_THPT_10 || !noi_hoc_THPT_11 ||
        !noi_hoc_THPT_12 || !truong_hoc_10 || !truong_hoc_11 || !truong_hoc_12 || !nam_tot_nghiep_THPT || !so_bao_danh || !he_dao_tao || !nganh_dao_tao || !phuong_thuc_xet_tuyen ||
        !hoc_luc_12 || !hanh_kiem_ca_nam || !thuoc_khu_vuc || !thuoc_doi_tuong_uu_tien || !dia_chi_bao_tin_khi_trung_tuyen || !so_dien_thoai || !email) {
        throw new Error('Vui lòng kiểm tra và dảm bảo điền đầy đủ thông tin');
    }



    const existingRegistrationFormEmail = await registrationFormModel.findRegistrationFormByEmail(email);
    const existingRegistrationFormPhone = await registrationFormModel.findRegistrationFormByPhone(so_dien_thoai);

    if(existingRegistrationFormEmail.length || existingRegistrationFormPhone.length){
        throw new Error('Đơn đăng ký của email hoặc số điện thoại này đã tồn tại !');
    }

    await registrationFormModel.createRegistrationForm(formData);

}

const getCountRegistrationFormByStatus = async (status)=>{
    if(!status && status!==0){
        throw new Error('Không có dữ liệu !');
    }
    return await registrationFormModel.getCountRegistrationFormByStatus(status);
}

const getAllRegistrationsFrom = async () => {
    return await registrationFormModel.getAllRegistrationsFrom();
}

const updateRegistrationsFrom = async (id, status) => {
    const exitForm = await registrationFormModel.findRegistrationFormById(id);
    if(!exitForm.length){
        throw new Error('Phiếu đăng ký không tồn tại !');
    }

    await registrationFormModel.updateRegistrationsFrom(id, status);
}

const getRegistrationsFromByStatus = async (status) => {
    return await registrationFormModel.getRegistrationsFromByStatus(status);
}

const getCountRegistrationForm = async() => {
    return await registrationFormModel.getCountRegistrationForm();
}


module.exports = {
    createRegistrationForm,
    getCountRegistrationFormByStatus,
    getAllRegistrationsFrom,
    updateRegistrationsFrom,
    getRegistrationsFromByStatus,
    getCountRegistrationForm
}