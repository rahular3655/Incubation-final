import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import AdminRoute from './utils/AdminRoute';
import { AuthProvider } from './context/AuthContext'
import AdminHome from "./pages/AdminHome";
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/UserRegister'
import AdminLogin from './pages/AdminLogin';
import Header from './components/Header'
import ApprovedApplications from './components/ApprovedApplication';
import AllApplications from './components/AllApplications';
import DeclinedApplications from './components/DeclinedApplication';
import AllotedApplications from './components/AllottedApplications';
import PendingApplications from './components/PendingApplications';
import Profile from './components/Profile';
import AllSlots from './components/Allslots';
import ApplicationForm from "./pages/ApplicationForm";
import Restricted from "./pages/Restricted";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>


        <AuthProvider>
          <Routes>
          <Route element={<AdminRoute/>}>
          <Route path="/adminhome"  element={<AdminHome/>}  />
          <Route path="/applications" element={<AllApplications/>} />
          <Route path="/approved" element={<ApprovedApplications/>} />
          <Route path="/pending" element={<PendingApplications/>} />
          <Route path="/rejected" element={<DeclinedApplications/>} />
          <Route path="/alloted" element={<AllotedApplications/>} />
          <Route path="/allslots" element={<AllSlots/>} />
          <Route path="/adminlogin" exact element={<AdminLogin/>}  />
          </Route>
          </Routes>

          <Routes>

          <Route path="/restricted" element={<Restricted/>}/>
          <Route path="/" exact element={<HomePage/>}  />
          <Route path="/login" exact element={<LoginPage/>}  />
          <Route path="/register" element={<RegisterPage/>} />
          <Route element={<PrivateRoute/>}>
          <Route path="/application" element={<ApplicationForm/>} />
          <Route path="/profile" element={<Profile/>} />
          </Route>
          </Routes>
        </AuthProvider>

        
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;