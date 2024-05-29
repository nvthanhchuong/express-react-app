import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import '../../../assets/css/Dashboard.css';
import StudentManagement from './child/StudentManagement';
import DashboardContent from './child/DashboardContent';
import AdminManagement from './child/AdminManagement';
import RegistrationFormManagement from './child/RegistrationFormManagement';
import FormAccept from './child/FormAccept';
import FormCancel from './child/FormCancel';

const DashboardComponent = () => {
  document.title = 'Trang quản trị';

  const [collapsed, setCollapsed] = useState(false);
  const navigateTo  = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed); // Invert the current state
  };

  const adminData = JSON.parse(localStorage.getItem('adminData'));

    const logout = () => {
      localStorage.removeItem("adminData");
      navigateTo("/admin/login");
  
  }

  return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar
          className="app bg__sidebar"
          collapsed={collapsed}
          breakPoint="md"
          onToggle={toggleCollapse}
        >
          <Menu>
            <MenuItem
              className="menu1"
              icon={<MenuRoundedIcon />}
              onClick={toggleCollapse} // Add onClick handler to toggle collapse
            >
              <h2>ADMIN</h2>
              <span>{ adminData.username }</span>
            </MenuItem>
            <MenuItem
              component={<Link to="/admin/dashboard" className="link" />}
              icon={<GridViewRoundedIcon />}
            >
              Trang chủ
            </MenuItem>
            <MenuItem component={<Link to="/admin/dashboard/admin-manager" className="link" />} icon={<ReceiptRoundedIcon />}> Quản trị viên </MenuItem>
            <SubMenu label="Sinh viên" icon={<BarChartRoundedIcon />}>
              <MenuItem
                component={<Link to="/admin/dashboard/student-manager" className="link" />}
                icon={<TimelineRoundedIcon />}
              >
                Quản lý sinh viên
              </MenuItem>
              <MenuItem component={<Link to="/admin/dashboard/registration-form-manager" className="link"/>} icon={<BubbleChartRoundedIcon />}>Đơn đăng ký</MenuItem>
              <MenuItem component={<Link to="/admin/dashboard/registration-form-accept" className="link"/>} icon={<CheckCircleIcon />}>Đã xét duyệt</MenuItem>
              <MenuItem component={<Link to="/admin/dashboard/registration-form-cancel" className="link"/>} icon={<CancelIcon />}>Đã từ chối</MenuItem>

            </SubMenu>
            <SubMenu label="Bài Viết" icon={<WalletRoundedIcon />}>
              <MenuItem icon={<AccountBalanceRoundedIcon />}>
              Quản lý bài viết
              </MenuItem>
              <MenuItem icon={<SavingsRoundedIcon />}>Thể Loại</MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link to="/" className="link" />}
              icon={<MonetizationOnRoundedIcon />}
            >
              Website
            </MenuItem>
            <SubMenu label="Cài đặt" icon={<SettingsApplicationsRoundedIcon />}>
              <MenuItem icon={<AccountCircleRoundedIcon />}> Account </MenuItem>
              <MenuItem icon={<ShieldRoundedIcon />}> Privacy </MenuItem>
              <MenuItem icon={<NotificationsRoundedIcon />}>
                Notifications
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<LogoutRoundedIcon />} onClick={logout}> Đăng xuất </MenuItem>
          </Menu>
        </Sidebar>
        <section>
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="student-manager" element={<StudentManagement />} />
            <Route path="admin-manager" element={<AdminManagement />} />
            <Route path="registration-form-manager" element={<RegistrationFormManagement />} />
            <Route path="registration-form-accept" element={<FormAccept />} />
            <Route path="registration-form-cancel" element={<FormCancel />} />
          </Routes>
        </section>
      </div>
  );
};

export default DashboardComponent;
