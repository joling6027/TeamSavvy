import './App.css';
import Login from './components/login/Login';
import "./assets/css/bootstrap.min.css";
import ForgotPasswordOtp from './components/forgetPassword/ForgetPasswordOtp';
import ResetPassword from './components/forgetPassword/ResetPassword';
import Sidenav from './components/sidenav/Sidenav';
import Dashboard from './components/dashboard/Dashboard';
import { Routes, Route } from "react-router-dom";
import Profile from './components/profile/Profile';
import Task from './components/task/Task';
import Payroll from './components/payroll/Payroll';
import Timesheet from './components/timesheet/Timesheet';
import InternalJobs from './components/internaljobs/InternalJobs';
import Header from './components/header/Header';
import Paystub from './components/payroll/PayStub';
// import AuthService from './components/services/authService/AuthService';

import data from './data.json'
import { COLUMNS } from './column'
import AuthService from './components/services/authService';



function App() {
  const { getToken } = AuthService();
  if (!getToken()) {
    return (
      <>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetPassword" element={<ForgotPasswordOtp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path='*' element={<Login />} />
          </Routes>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="App">
        <Sidenav />
        <main className="d-inline-block w-100">
          <header className="sticky-top bg-header">
            <Header />
          </header>
          <Routes>
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timesheet" element={<Timesheet />} />
            <Route path="/task" element={<Task />} />
            <Route path="/payroll" element={<Payroll data={data} columns={COLUMNS} />} />
            <Route path="/jobs" element={<InternalJobs />} />
            <Route path='/payroll/payrollId/:id' element={<Paystub />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;