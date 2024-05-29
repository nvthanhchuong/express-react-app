
import '../../../../assets/css/Student.css';
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

const FormAccept = () => {

    const [dataRegistrationsFromByStatus, setRegistrationsFromByStatus] = useState([]);


    const fetchRegistrationsFromByStatus = async (status) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/get-registration-form-by-status`, {
                status
            });

            if (response.data.formData) {
                setRegistrationsFromByStatus(response.data.formData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    // Call fetchData on component mount and whenever dataUser changes
    const [fetchDataFlag, setFetchDataFlag] = useState(true);

    useEffect(() => {
        if (fetchDataFlag) {
            fetchRegistrationsFromByStatus(1);
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
          dataIndex: 'ho_va_ten',
          key: 'ho_va_ten',
        },
        {
          title: 'Hệ đào tạo',
          dataIndex: 'he_dao_tao',
          key: 'he_dao_tao',
        },
        {
          title: 'Nghành đăng ký',
          dataIndex: 'nganh_dao_tao',
          key: 'nganh_dao_tao',
        },
        {
          title: 'Học lực lớp 12',
          dataIndex: 'hoc_luc_12',
          key: 'hoc_luc_12',
        },
        {
            title: 'Trạng thái',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a style={{ color: "green" }}>Đã xét duyệt</a>
                </Space>
            ),
        },
    ];



    return (
        <div className='student__container'>
            <div className='dashboard__breadcumb'>
                <h4>Phiếu Đăng Ký Đã Được Xét Duyệt</h4>
            </div>
            <div style={{ width: '100%', height: '100%', padding: "50px" }}>
            <Table style={{ border: "1px solid #ccc", borderRadius: "5px" }} columns={columns} dataSource={dataRegistrationsFromByStatus} rowKey="id" />
            </div>
        </div>
    )
}

export default FormAccept;