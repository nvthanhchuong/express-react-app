import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from './Components/pages/web/HomeComponent';
import RegisterFormComponent from './Components/pages/web/RegisterFormComponent';

// admin
import AdminLoginComponent from './Components/pages/admin/AdminLoginComponent';
import DashboardComponent from './Components/pages/admin/DashboardComponent';

//chikd admin
import StudentManagement from './Components/pages/admin/child/StudentManagement';
import DashboardContent from './Components/pages/admin/child/DashboardContent';
import AdminManagement from './Components/pages/admin/child/AdminManagement';
import RegistrationFormManagement from './Components/pages/admin/child/RegistrationFormManagement';
import FormAccept from './Components/pages/admin/child/FormAccept';
import FormCancel from './Components/pages/admin/child/FormCancel';

//web
import UserLoginComponent from './Components/pages/web/UserLoginComponent';
import UserRegisterComponent from './Components/pages/web/UserRegisterComponent';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<UserLoginComponent />} />
        <Route path="/register" element={<UserRegisterComponent />} />

        <Route path="/registration-form" element={<RegisterFormComponent />} />

        <Route path="/admin/login" element={<AdminLoginComponent />}/>
        <Route path="/admin/dashboard" element={<DashboardComponent />}> 
          <Route path="" element={<DashboardContent />} />
          <Route path="student-manager" element={<StudentManagement />} />
          <Route path="admin-manager" element={<AdminManagement />} />
          <Route path="registration-form-manager" element={<RegistrationFormManagement />} />
          <Route path="registration-form-accept" element={<FormAccept />} />
          <Route path="registration-form-cancel" element={<FormCancel />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
