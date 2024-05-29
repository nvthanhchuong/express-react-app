
import '../../../../assets/css/Dashboard.css';
import images from '../../../../const/images';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardContent = () => {

    // State to store the fetched data
    const [countUser, setDataCountUser] = useState([]);
    const [countRegistrationFormPending, setDataRegistrationFormPending] = useState([]);
    const [countRegistrationFormAccept, setDataRegistrationFormAccept] = useState([]);
    const [countRegistrationFormCancel, setDataRegistrationFormCancel] = useState([]);
    const [countRegistrationFormAll, setDataRegistrationFormAll] = useState([]);
    


    const fetchDataCountUser = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-count-all-user`);
          if(response.data.userCount){
            setDataCountUser(response.data.userCount);
          }else{
            setDataCountUser(0);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      

      const fetchDataRegistrationFormAll = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-count-registration-form-all`);

          if(response.data.countAllForm){
            setDataRegistrationFormAll(response.data.countAllForm);
          }else{
            setDataRegistrationFormAll(0);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const fetchDataRegistrationFormPending = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/get-count-registration-form`, {status: 0});

          if(response.data.count){
            setDataRegistrationFormPending(response.data.count);
          }else{
            setDataRegistrationFormPending(0);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const fetchDataRegistrationFormAccept = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/get-count-registration-form`, {status: 1});

          if(response.data.count){
            setDataRegistrationFormAccept(response.data.count);
          }else{
            setDataRegistrationFormAccept(0);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const fetchDataRegistrationFormCancel = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/get-count-registration-form`, {status: 2});

          if(response.data.count){
            setDataRegistrationFormCancel(response.data.count);
          }else{
            setDataRegistrationFormCancel(0);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    
      // Call fetchData on component mount
      useEffect(() => {
        fetchDataCountUser();
        fetchDataRegistrationFormAll();
        fetchDataRegistrationFormPending();
        fetchDataRegistrationFormAccept();
        fetchDataRegistrationFormCancel()
      }, []);



    return (
        <div className='dashboard__container'>
            <div className='dashboard__breadcumb'>
                <h4>Trang Chủ</h4>
            </div>
            <div className='dashboard__content'>
                <div>
                <div className='dashboard__content__data'>
                    <div className='data__card'>
                        <div className='data__card__icon data__card__icon__two'>
                        <TaskAltIcon className='data__icon'/>
                        </div>
                        <div className='data__card__text'>
                           <div>
                           <div>{countRegistrationFormAccept}</div>
                            <div>Đã xét duyệt</div>
                           </div>
                        </div>
                    </div>
                    <div className='data__card'>
                        <div className='data__card__icon data__card__icon__three'>
                        <CancelIcon className='data__icon'/>
                        </div>
                        <div className='data__card__text'>
                           <div>
                           <div>{countRegistrationFormCancel}</div>
                            <div>Đã từ chối</div>
                           </div>
                        </div>
                    </div>
                    
                </div>
                <div className='dashboard__content__data'>
                    <div className='data__card'>
                        <div className='data__card__icon data__card__icon__one'>
                            <AccountCircleIcon className='data__icon'/>
                        </div>
                        <div className='data__card__text'>
                           <div>
                           <div>{countUser}</div>
                            <div>Sinh viên</div>
                           </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard__content__data'>
                    <div className='data__card'>
                        <div className='data__card__icon data__card__icon__four'>
                        <PendingIcon className='data__icon'/>
                        </div>
                        <div className='data__card__text'>
                           <div>
                           <div>{countRegistrationFormPending}</div>
                            <div>Chờ xét duyệt</div>
                           </div>
                        </div>
                    </div>
                    <div className='data__card'>
                        <div className='data__card__icon data__card__icon__five'>
                        <InsertDriveFileIcon className='data__icon'/>
                        </div>
                        <div className='data__card__text'>
                           <div>
                           <div>{countRegistrationFormAll }</div>
                            <div>Tổng Phiếu</div>
                           </div>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardContent;