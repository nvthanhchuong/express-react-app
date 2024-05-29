import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import styles from "../../../assets/css/SignUp.module.css";
import { notify } from "../../../const/toast";
import images from "../../../const/images";


const AdminLoginComponent = () => {
    document.title = 'Đăng nhập trang quản trị';
    const navigateTo  = useNavigate();

    const [data, setData] = useState({
        username: "",
        password: "",
      });
    
      const [touched, setTouched] = useState({});
    
      const checkData = (obj) => {
        const { username, password } = obj;
        const urlApi = `${import.meta.env.VITE_API_URL}/api/admin/login`;
        const api = axios
          .post(urlApi, { username: username.toLowerCase(), password })
          .then((response) => response.data)
          .then((data) => {
            if (data.admin) {
                notify("Bạn đã đăng nhập tài khoản thành công !", "success");
                // After successful login
                localStorage.setItem('adminData', JSON.stringify(data.admin));
                // Điều hướng sang URL mới
                setTimeout(() => {
                  navigateTo('/admin/dashboard');
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
            <h2>ADMIN</h2>
            <div>
              <div>
                <input type="text" name="username" value={data.username} placeholder="Username" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                <img src={images.user} alt="" />
              </div>
            </div>
            <div>
              <div>
                <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                <img src={images.password} alt="" />
              </div>
            </div>
    
            <div>
              <button type="submit">Đăng Nhập</button>
              <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
                Don't have a account? <Link to="/signup">Create account</Link>
              </span>
            </div>
          </form>
          <ToastContainer />
        </div>
  );
};

export default AdminLoginComponent;