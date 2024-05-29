import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import styles from "../../../assets/css/SignUp.module.css";
import { notify } from "../../../const/toast";
import images from "../../../const/images";


const UserRegisterComponent = () => {
    document.title = 'Đăng nhập trang quản trị';
    const navigateTo  = useNavigate();

    const [data, setData] = useState({
        full_name: "",
        email: "",
        password: "",
        re_password: "",
        phone: ""
      });
    
      const [touched, setTouched] = useState({});
    
      const checkData = (obj) => {
        const { full_name, email, password, re_password, phone } = obj;
        const urlApi = `${import.meta.env.VITE_API_URL}/api/register`;
        const api = axios
          .post(urlApi, { full_name, email, password, re_password, phone })
          .then((response) => response.data)
          .then((data) => {
            if (data.success) {
                notify("Bạn đã đăng ký tài khoản thành công !", "success");
                // Điều hướng sang URL mới
                setTimeout(() => {
                  navigateTo('/login');
                }, 2000)
            } else {
                notify("Đã có lỗi xảy ra !", "error");
            }
        });
        toast.promise(api, {
          pending: "Đang chuyển hướng trang...",
          success: false,
          error: "Đã xảy ra lỗi !",
        });
      };
    
      const changeHandler = (event) => {
        if (event.target.name === "IsAccepted") {
          setData({ ...data, [event.target.name]: event.target.checked });
        } else {
          setData({ ...data, [event.target.name]: event.target.value });
        }
      };
    
      const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
      };
    
      const submitHandler = (event) => {
        event.preventDefault();
        checkData(data);
      };
    
      return (
        <div className={styles.container}>
          <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
            <h2>Đăng Ký</h2>
            <div>
              <div>
                <input type="text" name="full_name" value={data.username} placeholder="Họ và tên" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                <img src={images.user} alt="" />
              </div>
            </div>
            <div>
              <div>
                <input type="text" name="email" value={data.username} placeholder="Email" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                <img src={images.email} alt="" />
              </div>
            </div>
            <div>
              <div>
                <input type="password" name="password" value={data.password} placeholder="Mật khẩu" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                <img src={images.password} alt="" />
              </div>
            </div>
            <div>
              <div>
                <input type="password" name="re_password" value={data.re_password} placeholder="Nhập lại mật khẩu" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                <img src={images.password} alt="" />
              </div>
            </div>
            <div>
              <div>
                <input type="text" name="phone" value={data.username} placeholder="Số điện thoại" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                <img src={images.check} alt="" />
              </div>
            </div>
            <div>
              <button type="submit">Đăng Ký</button>
              <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
                Đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
              </span>
            </div>
          </form>
          <ToastContainer />
        </div>
  );
};

export default UserRegisterComponent;