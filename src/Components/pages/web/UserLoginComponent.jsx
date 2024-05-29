import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import styles from "../../../assets/css/SignUp.module.css";
import { notify } from "../../../const/toast";
import images from "../../../const/images";


const UserLoginComponent = () => {
    document.title = 'Đăng nhập trang quản trị';
    const navigateTo  = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
      });
    
      const [touched, setTouched] = useState({});
    
      const checkData = (obj) => {
        const { email, password } = obj;
        const urlApi = `${import.meta.env.VITE_API_URL}/api/login`;
        const api = axios
          .post(urlApi, { email, password })
          .then((response) => response.data)
          .then((data) => {
            if (data.user) {
                notify("Bạn đã đăng nhập tài khoản thành công !", "success");
                // After successful login
                localStorage.setItem('userData', JSON.stringify(data.user));
                // Điều hướng sang URL mới
                setTimeout(() => {
                  navigateTo('/');
                }, 3000)
            } else {
                notify("Mật khẩu hoặc tên người dùng của bạn không chính xắc !", "error");
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
            <h2>Đăng Nhập</h2>
            <div>
              <div>
                <input type="text" name="email" value={data.email} placeholder="Nhập địa chỉ email" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                <img src={images.email} alt="" />
              </div>
            </div>
            <div>
              <div>
                <input type="password" name="password" value={data.password} placeholder="Nhập mật khẩu" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                <img src={images.password} alt="" />
              </div>
            </div>
    
            <div>
              <button type="submit">Đăng Nhập</button>
              <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
              </span>
            </div>
          </form>
          <ToastContainer />
        </div>
  );
};

export default UserLoginComponent;