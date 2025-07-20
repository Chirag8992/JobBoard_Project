
import './index.css'
import Landingpage from "./component/LandingPage"
import SignUpPage from "./component/SignupPage"
import { Routes,Route } from "react-router-dom";
import LoginPage from './component/LoginPage'
import JobPage from './component/JobPage';
import Employee from './component/Employee';
import JobSeeker from './component/Jobseeker';
import AddJob from './component/AddJob';
import EmployeeProfile from './component/employeeprofile';
import JobseekerProfile from './component/jobseekerprofile';
import CompanyProfile from './component/Company';
import ManageApplications from './component/ManageApplication';


function App() {

  return (
    
    <Routes>
      <Route path="/" element={<Landingpage/>}></Route>
      <Route path ="/SignupPage" element={<SignUpPage/>}></Route>
      <Route path="/LoginPage" element={<LoginPage/>}></Route>
      <Route path="/Jobpage" element={<JobPage/>}></Route>
      <Route path="/employee" element={<Employee/>}></Route>
      <Route path="/JobSeeker" element={<JobSeeker/>}></Route>
      <Route path='/addJobs' element={<AddJob/>}></Route>
      <Route path='/employeeprofile' element={<EmployeeProfile/>}></Route>
      <Route path = '/jobseekerProfile' element={<JobseekerProfile/>}></Route>
      <Route path = '/copamnyProfile' element={<CompanyProfile/>}></Route>
      <Route path='/Manageapplication' element={<ManageApplications/>}></Route>
    </Routes>
    
  )
}

export default App
