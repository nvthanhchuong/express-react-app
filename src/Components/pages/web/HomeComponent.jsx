

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../assets/css/Home.css';
import images from "../../../const/images";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HomeComponent = () => {

  document.title = 'Tuyển sinh - Trường Đại Học Thái Bình';

  // Get userData if login success
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigateTo  = useNavigate();



  // State to store the fetched data
  const [dataPost, setDataPost] = useState([]);
  const [dataEducation, setDataEducation] = useState([]);

  // Function to fetch data using Axios
  const fetchDataPost = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
      setDataPost(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataEducation = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/education`);
      setDataEducation(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    fetchDataPost();
    fetchDataEducation();
  }, []);

  const login = () =>{
    navigateTo("/login");
  }

  const logout = () => {
    localStorage.removeItem("userData");
    navigateTo("/login");
  }



  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };


  return (
    <div className="home">
      <div className="home__container">
        <div className="home__header">
            <div className="home__header__left">
              <Link to="/"><img src={images.logo}/></Link>
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

        <Slider {...settings}>
          <div className="home__slide__img">
            <img src={images.slide_1}/>
          </div>
          <div className="home__slide__img">
          <img src={images.slide_2}/>

          </div>
          <div className="home__slide__img">
            <img src={images.slide_3}/>
          </div>
          <div className="home__slide__img">
            <img src={images.slide_4}/>
          </div>
          <div className="home__slide__img">
            <img src={images.slide_5}/>
          </div>
        </Slider>


        <div className="home__contents">
          <div className="home__contents_child">
            <div className="admissions__news">
              <div className="admissions__news__title">
                <span>| Tin tuyển sinh</span>
              </div>
              <div className="admissions__news__post">
                <div className="admissions__news__post__left">
                  <div className="news__post__main">
                    <img src={images.post_1} />
                  </div>
                  <div className="news__post__main__title">
                    Trường Đại học Thái Bình tiếp và làm việc với Trường Đại học Khoa học Xã hội, Đại học Quốc gia Seoul, Hàn Quốc
                  </div>
                  <div className="news__post__main__description">
                    Chiều ngày 16/9/2023, Trường Đại học Thái Bình đã có buổi tiếp đón và làm việc với Đoàn công tác của trường Đại học Khoa học Xã hội (KHXH), Đại học quốc gia Seoul, Hàn Quốc cùng tìm hiểu và thảo luận cơ hội hợp tác.
                  </div>
                </div>
                <div className="admissions__news__post__right">
                    <div className="news__post__main__img">
                      <img src={images.post_2} />
                    </div>
                    <div className="news__post__main__right__title">
                    Lễ ký kết thỏa thuận hợp tác chiến lược giữa trường Đại Học Thái Bình (TBU) và Ngân Hàng Thương Mại Cổ Phần Sài gòn - Hà Nội (SHB)
                  </div>
                  <div >
                  {dataPost.map((post) => (
                    <div className="news__post__main__right__title post__main__right__title__small " key={post.id}>
                      { post.title }
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="home__educational__system">
              <div className="admissions__news__title">
                <span>| Hệ thống đào tạo</span>
              </div>
              <div className="home__educational__system__card">
              {dataEducation.map((education) => (
                <div className={`educational__system__card__default educational__system__card__${education.id}`} key={education.id}>
                  <p>{education.title}</p>
                </div>
              ))}
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
    </div>
  );
};

export default HomeComponent;
