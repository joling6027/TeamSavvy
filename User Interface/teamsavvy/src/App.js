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
import JobAppliedEmployees from './components/jobAppliedEmployees/JobAppliedEmployees'
import data from './data.json'
import { COLUMNS } from './column'
import AuthService from './components/services/authService';
import AddEmployee from './components/addEmployee/AddEmployee';
import TeamMembers from './components/teamMembers/TeamMembers';
import EmployeeDetails from './components/employeeDetails/EmployeeDetails';
import ProjectDetails from './components/projectDetails/ProjectDetails'
import ProjectList from './components/projectList/ProjectList'

function App() {
  const { http, user, getToken } = AuthService();
  if (!getToken()) {
    return (
      <>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetPassword/:id" element={<ForgotPasswordOtp />} />
            <Route path="/resetpassword/:id" element={<ResetPassword />} />
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
            <Route path="/" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path='/dashboard/teammembers/addemployee' element={<AddEmployee/>}/>
            <Route path='/dashboard/teammembers' element={<TeamMembers />}/>
            <Route path="/dashboard/teammembers/employeedetails/:id" element={<EmployeeDetails/>} />
            <Route path="/dashboard/teammembers/employeedetails/:id/:projId" element={<EmployeeDetails/>} />
            <Route path="/timesheet" element={<Timesheet />} />
            <Route path="/task" element={<Task />} />
            <Route path="/payroll" exact element={<Payroll />} />
            <Route path="/jobs" element={<InternalJobs />} />
            <Route path='/payroll/paystub/:payrollid' element={<Paystub />} />
            <Route path="/jobs/applied" element={<JobAppliedEmployees />} />
            <Route path="/jobs/applied/employeedetails/:id" element={<EmployeeDetails />} />
            <Route path="/dashboard/projects" element={<ProjectList/>} />
            <Route path="/dashboard/projects/projectdetail/:id" element={<ProjectDetails />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
export default App;