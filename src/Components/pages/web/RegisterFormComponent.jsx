import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import '../../../assets/css/Home.css';
import '../../../assets/css/RegisterForm.css';
import images from "../../../const/images";
import { Button, Form, Input, Radio, Space, DatePicker, Select } from 'antd';
import moment from 'moment';
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../../const/toast";
import { ToastContainer, toast } from "react-toastify";





const RegisterFormComponent = () => {
    document.title = 'Đăng ký hồ sơ xét tuyển Đại Học Chính Quy';

    const navigateTo  = useNavigate();


    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const userData = JSON.parse(localStorage.getItem('userData'));
    const logout = () => {
        localStorage.removeItem("userData");
        navigateTo("/login");
      }


    const { Option } = Select;

    const [selectedDate, setSelectedDate] = useState(moment());

    const handleDateChange = (date, dateString) => {
        setSelectedDate(date);
    };

    const onFinish = (values) => {
        const formData = values;
        formData["ngay_sinh"] = selectedDate.format();

        const urlApi = `${import.meta.env.VITE_API_URL}/api/registration-form`;
        axios
            .post(urlApi, { formData })
            .then((response) => {
                if (response.data.success) {
                    notify(response.data.message, "success");
                }
            })
            .catch((error) => {
                console.error("Error:", error.response.data.error);
                notify(error.response.data.error, "error");
            });
    };


    return (
        <div className="home">
            <div className="home__container">
                <div className="home__header">
                    <div className="home__header__left">
                        <Link to="/"><img src={images.logo} /></Link>
                    </div>
                    <div className="home__header__right">
        {userData ? (
          <div className="home__header__welcome">
            <div>Chào <a>{userData.full_name}</a></div>
            <div className="home__header__logout"><a onClick={logout}>Đăng xuất</a></div>
          </div>
        ) : (
          <div className="home__header__login">
            <button onClick={login}>Đăng nhập tài khoản</button>
          </div>
        )}
      </div>
                </div>

                <div className="home__navigation">
                    <ul className="home__ul__nav">
                        <li><Link to="/">Trang chủ</Link></li>
                        <li>Giới Thiệu</li>
                        <li><Link to="/registration-form">Đăng ký trực tuyến</Link></li>
                        <li>Tuyển Sinh</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>
            </div>

            <div className="register__form">
                <div className="register__form__container">
                    <div className="registration-form">
                        <div className="registration__title"><h2>Phiếu Đăng Ký Xét Tuyển Đại Học</h2></div>
                        <div className="registration__tip"><strong>Chú ý:</strong> Những mục đánh dấu <span className="form__required">(*)</span> là bắt buộc</div>

                        <div className="form__regis__content">
                            <div className="form__regis__info"><h3>Thông tin cá nhân</h3></div>
                            <div style={{ padding: "20px" }}>
                                <Form
                                    name="registration_form"
                                    style={{ width: "100%" }}
                                    layout="vertical"
                                    autoComplete="off"
                                    form={form}
                                >
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <Form.Item
                                            style={{ width: "40%" }}

                                            label="Họ và tên"
                                            className="bold-label"
                                            name="ho_va_ten"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập đầy đủ Họ và tên',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Viết đúng như giấy khai sinh bằng chữ in HOA có dấu" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ngày sinh"
                                            name="ngay_sinh"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập ngày sinh',
                                                },
                                            ]}
                                        >
                                            <DatePicker onChange={handleDateChange} placeholder="Chọn ngày sinh" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Số CCCD"
                                            name="so_cccd"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập số CCCD',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Số CMND/CCCD" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Giới tính"
                                            name="gioi_tinh"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn giới tính',
                                                },
                                            ]}
                                        >
                                            <Radio.Group>
                                                <Radio value="Nam">Nam</Radio>
                                                <Radio value="Nữ">Nữ</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>

                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <Form.Item
                                            style={{ width: "65%" }}
                                            label="Hộ khẩu thường trú"
                                            name="ho_khau_thuong_tru"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập địa chỉ hộ khẩu thường trú',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Ghi đầy đủ số nhà, đường phố, thôn, xã (phường), huyện (quận), tỉnh (thành phố)" />
                                        </Form.Item>

                                        <Form.Item
                                            style={{ width: "30%" }}
                                            label="Dân tộc"
                                            name="dan_toc"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn dân tộc',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Chọn dân tộc">
                                                <Option value="Kinh">Kinh</Option>
                                                <Option value="Khơ me">Khơ me</Option>
                                                <Option value="Tày">Tày</Option>
                                            </Select>
                                        </Form.Item>

                                    </div>

                                    <div style={{ width: "100%", display: "flex" }}>

                                        <Form.Item
                                            style={{ width: "30%" }}

                                            label="Hộ khẩu thuộc tỉnh"
                                            name="ho_khau_tinh"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tỉnh hộ khẩu',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập tỉnh hộ khẩu" />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ width: "50%", marginLeft: "50px" }}
                                            label="Hộ khẩu thuộc huyện"
                                            name="ho_khau_huyen"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập huyện hộ khẩu',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập huyện hộ khẩu" />
                                        </Form.Item>

                                    </div>

                                    <div style={{ width: "100%", display: "flex" }}>

                                        <Form.Item
                                            style={{ width: "30%" }}

                                            label="Nơi học THPT lớp 10"
                                            name="noi_hoc_THPT_10"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập nơi học lớp 10',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập nơi học lớp 10" />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ width: "50%", marginLeft: "50px" }}

                                            label="Trường học lớp 10"
                                            name="truong_hoc_10"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập trường học lớp 10',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập trường học lớp 10" />
                                        </Form.Item>
                                    </div>


                                    <div style={{ width: "100%", display: "flex" }}>

                                        <Form.Item
                                            style={{ width: "30%" }}

                                            label="Nơi học THPT lớp 11"
                                            name="noi_hoc_THPT_11"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập nơi học lớp 11',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập nơi học lớp 11" />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ width: "50%", marginLeft: "50px" }}

                                            label="Trường học lớp 11"
                                            name="truong_hoc_11"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập trường học lớp 11',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập trường học lớp 11" />
                                        </Form.Item>
                                    </div>
                                    <div style={{ width: "100%", display: "flex" }}>

                                        <Form.Item
                                            style={{ width: "30%" }}
                                            label="Nơi học THPT lớp 12"
                                            name="noi_hoc_THPT_12"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập nơi học lớp 12',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập nơi học lớp 12" />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ width: "50%", marginLeft: "50px" }}
                                            label="Trường học lớp 12"
                                            name="truong_hoc_12"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập trường học lớp 12',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập trường học lớp 12" />
                                        </Form.Item>

                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

                                        <Form.Item
                                            style={{ width: "40%" }}
                                            label="Năm tốt nghiệp THPT hoặc tương đương"
                                            name="nam_tot_nghiep_THPT"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập năm tốt nghiệp THPT hoặc tương đương',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập năm tốt nghiệp THPT hoặc tương đương" />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ width: "50%" }}


                                            label="Số báo danh"
                                            name="so_bao_danh"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập số báo danh',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập số báo danh" />
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="form__regis__content" style={{ marginTop: "20px" }}>
                            <div className="form__regis__info"><h3>THÔNG TIN ĐĂNG KÝ XÉT TUYỂN</h3></div>
                            <div style={{ padding: "20px" }}>
                                <Form
                                    form={form}
                                    name="trigger"
                                    onFinish={onFinish}
                                    layout="left"
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name="he_dao_tao"
                                        label="Hệ đào tạo"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn hệ đào tạo',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn hệ đào tạo">
                                            <Option value="Đại Học Chính Quy">Đại Học Chính Quy</Option>
                                            <Option value="Cao Đẳng Chính Quy">Cao Đẳng Chính Quy</Option>
                                            <Option value="Trung Cấp Chính Quy">Trung Cấp Chính Quy</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="nganh_dao_tao"
                                        label="Ngành đào tạo"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn ngành đào tạo',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn ngành đào tạo">
                                            <Option value="Kinh tế tài chính">Kinh tế tài chính</Option>
                                            <Option value="Quản trị kinh doanh">Quản trị kinh doanh</Option>
                                            <Option value="Nhà hàng khách sạn">Nhà hàng khách sạn</Option>
                                            <Option value="Du lịch và Lữ hành">Du lịch và Lữ hành</Option>
                                            <Option value="Công nghệ thông tin">Công nghệ thông tin</Option>
                                            <Option value="Ngôn ngữ anh">Ngôn ngữ anh</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="phuong_thuc_xet_tuyen"
                                        label="Phương thức xét tuyển"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn phương thức xét tuyển',
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio value="0" style={{ color: "red" }}>Xét theo điểm thi THPT Quốc gia</Radio>
                                            <Radio value="1" style={{ color: "red" }}>Xét theo điểm TBC học bạ lớp 12</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        name="hoc_luc_12"
                                        label="Học lực lớp 12"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn học lực lớp 12',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn học lực lớp 12">
                                            <Option value="Xuất sắc">Xuất sắc</Option>
                                            <Option value="Giỏi">Giỏi</Option>
                                            <Option value="Khá">Khá</Option>
                                            <Option value="Trung bình">Trung bình</Option>
                                            <Option value="Yếu">Yếu</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="hanh_kiem_ca_nam"
                                        label="Hạnh kiểm cả năm"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn hạnh kiểm cả năm',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn hạnh kiểm cả năm">
                                            <Option value="Tốt">Tốt</Option>
                                            <Option value="Khá">Khá</Option>
                                            <Option value="Trung bình">Trung bình</Option>
                                            <Option value="Yếu">Yếu</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="thuoc_khu_vuc"
                                        label="Thuộc khu vực"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn khu vực',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn khu vực">
                                            <Option value="Khu vực 1">Khu vực 1</Option>
                                            <Option value="Khu vực 2">Khu vực 2</Option>
                                            <Option value="Khu vực 2 nông thôn">Khu vực 2 nông thôn</Option>
                                            <Option value="Khu vực 3">Khu vực 3</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="thuoc_doi_tuong_uu_tien"
                                        label="Thuộc đối tượng ưu tiên"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn đối tượng ưu tiên',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn đối tượng ưu tiên">
                                            <Option value="Đối tượng 1">Đối tượng 1</Option>
                                            <Option value="Đối tượng 2">Đối tượng 2</Option>
                                            <Option value="Đối tượng 3">Đối tượng 3</Option>
                                            <Option value="Đối tượng 4">Đối tượng 4</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa chỉ báo tin khi trúng tuyển"
                                        name="dia_chi_bao_tin_khi_trung_tuyen"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập rõ họ tên, địa chỉ người nhận',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Ghi rõ họ tên, địa chỉ người nhận" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Số điện thoại"
                                        name="so_dien_thoai"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số điện thoại',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập số điện thoại liên hệ" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa chỉ email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập địa chỉ email',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập địa chỉ email" />
                                    </Form.Item>

                                    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
                                        <strong>
                                            Tôi xin cam đoan những lời khai trong Phiếu Đăng ký xét tuyển này là đúng sự thật.
                                            <br />
                                            Nếu sai tôi xin chịu xử lý theo Qui chế Tuyển sinh của Bộ Giáo dục & Đào tạo.
                                        </strong>
                                    </div>

                                    <Form.Item style={{ textAlign: "center", marginTop: "35px" }}>
                                        <Space>
                                            <Button type="primary" htmlType="submit">
                                                Nộp đơn
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home__footer">
                <div className="home__footer__container">
                    <div className="home__footer__left">
                        <p>Trường Đại Học Thái Bình (TBU)</p>
                        <p>Địa chỉ: Tân Bình, thành phố Thái Bình, tỉnh Thái Bình</p>
                        <p>Điện thoại: 02273633669 - Fax: (0227)3633723</p>
                        <p>Email: dhtb@tbu.edu.vn</p>
                        <p>Website: tbu.edu.vn</p>
                    </div>
                    <div className="home__footer__right">
                        <div>
                            <p>Thống kê | Sơ đồ | Liên hệ</p>
                            <p>Bản quyền © 2024 TBU</p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterFormComponent;
