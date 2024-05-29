const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routers/adminRoutes');

const app = express();
const path = require('path');
const ejs = require('ejs');

const routes = require('./routers')

require('dotenv').config();
const PORT = process.env.PORT || 3000;


app.use(cors()); // Enable CORS for all routes

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


app.listen(PORT, () => console.log("Server started"));

app.use(routes);

const posts = [
    {
        id: 1,
        title: 'Ký kết chương trình hợp tác giữa Đại học Zeilona Góra, Ba Lan với Trường Đại học Thái Bình',
        images: '',
        description: 'Ngày 17/9, tại Trường Đại học Thái Bình tổ chức Hội nghị ký kết chương trình hợp tác giữa Đại học Zeilona Góra, Ba Lan với Trường Đại học Thái Bình.'
    },
    {
        id: 2,
        title: 'Bộ Giáo dục và Đào tạo (GDĐT) công bố 15 đề thi tham khảo Kỳ thi tốt nghiệp trung học phổ thông (THPT) năm 2024.',
        images: '',
        description: 'Bộ Giáo dục và Đào tạo công bố những mốc thời gian và việc cần thực hiện trong đăng ký, xét tuyển đại học năm 2024.'
    },
    {
        id: 3,
        title: 'Tập Đoàn Icogroup Tuyển Dụng Nhân Viên Kinh Doanh',
        images: '',
        description: 'Làm việc trong môi trường năng động và điều kiện tốt nhất'
    },
];

const educational = [
    {
        id: 1,
        title: 'Tuyển sinh Tiến Sĩ'
    },
    {
        id: 2,
        title: 'Tuyển sinh Thạc Sĩ'
    },
    {
        id: 3,
        title: 'Tuyển sinh Đại Học'
    },
    {
        id: 4,
        title: 'Chương trình Quốc Tế'
    },
    {
        id: 5,
        title: 'Chương trình Việt Nhật'
    },
    {
        id: 6,
        title: 'Liên thông Đại Học'
    },
    {
        id: 7,
        title: 'Đại Học văn bằng 2'
    },
    {
        id: 8,
        title: 'Đại Học từ xa'
    },
]

app.get('/api/posts', (req, res) =>{
    res.send(posts);
})

app.get('/api/education', (req, res) =>{
    res.send(educational);
})