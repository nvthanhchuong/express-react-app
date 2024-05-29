
import '../../../../assets/css/Student.css';
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../../../const/toast";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Input } from 'antd';

const StudentManagement = () => {

    const [dataUser, setDataUser] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null); // State để lưu trữ bản ghi được chọn


    const fetchDataUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-all-users`);

            if (response.data.user) {
                setDataUser(response.data.user);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleDelete = async (id) => {
        try{
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete-admin-by-id/${id}`);
            if(response.data.success) {
                notify(response.data.message, "success");
                setFetchDataFlag(true); // Set flag to true to trigger fetchDataUser
            }
            
        } catch(error) {
        console.error("Error data:", error);
    }
}

const updateUser = async (dataUser) => {
    const {id, full_name, email, phone } = dataUser;
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/update-user`, {id, email, full_name, phone});
        if(response.data.success) {
            notify(response.data.message, "success");
            setFetchDataFlag(true); // Set flag to true to trigger fetchDataUser
        }
        
    } catch(error) {
    console.error("Error data:", error);
}
}

const [modal2Open, setModal2Open] = useState(false);

    // Call fetchData on component mount and whenever dataUser changes
    const [fetchDataFlag, setFetchDataFlag] = useState(true);

    useEffect(() => {
        if (fetchDataFlag) {
            fetchDataUser();
            setFetchDataFlag(false);
        }
    }, [fetchDataFlag]); // Trigger fetchDataUser when dataUser changes


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'full_name',
            key: 'full_name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        setSelectedRecord(record); // Lưu trữ bản ghi được chọn vào state
                        setModal2Open(true); // Mở popup chỉnh sửa
                    }}>Chỉnh sửa</a>
                    <a onClick={() => handleDelete(record.id)}>Xoá</a>
                </Space>
            ),
        },
    ];



    return (
        <div className='student__container'>
            <div className='dashboard__breadcumb'>
                <h4>Quản Lý Sinh Viên</h4>
            </div>
            <div style={{ width: '100%', height: '100%', padding: "50px" }}>
            <Table style={{ border: "1px solid #ccc", borderRadius: "5px" }} columns={columns} dataSource={dataUser} rowKey="id" />
            </div>
      <Modal
        title="Chỉnh sửa Sinh Viên"
        centered
        open={modal2Open}
        onOk={() => {
            setModal2Open(false);
            updateUser(selectedRecord);
        }}
        onCancel={() => setModal2Open(false)}
      >
                <Input 
        placeholder="Họ và tên" 
        value={selectedRecord ? selectedRecord.full_name : ''} 
        onChange={(e) => setSelectedRecord({...selectedRecord, full_name: e.target.value})} // Thêm hàm xử lý sự kiện onChange
    />
    <Input 
        placeholder="Địa chỉ email" 
        style={{ marginTop: "10px" }} 
        value={selectedRecord ? selectedRecord.email : ''} 
        onChange={(e) => setSelectedRecord({...selectedRecord, email: e.target.value})} // Thêm hàm xử lý sự kiện onChange
    />
    <Input 
        placeholder="Số điện thoại" 
        style={{ marginTop: "10px" }} 
        value={selectedRecord ? selectedRecord.phone : ''} 
        onChange={(e) => setSelectedRecord({...selectedRecord, phone: e.target.value})} // Thêm hàm xử lý sự kiện onChange
    />
      </Modal>
            <ToastContainer/>
        </div>
    )
}

export default StudentManagement;