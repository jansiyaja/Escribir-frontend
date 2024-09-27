import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage/HomePage";
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/User/ProtectedRoute';
import CommonPage from "./Pages/AuthPage";
import UserProfile from './Pages/Profile/UserProfile';
import { RootState } from './redux/store/store';
import './theme.css'
import LoginPage from './Pages/admin/LoginPage';
import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute';
import AdminDashboard from './Pages/admin/AdminDashBoard';

function App() {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <div className={darkMode ? 'dark bg-black text-white' : 'bg-white text-black'}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<CommonPage page="register" />} />
          <Route path="/OTP-Verification" element={<CommonPage page="otp" />} />
          <Route path="/login" element={<CommonPage page="login" />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminProtectedRoute/>}>
            <Route path='/adminDashBord' element={<AdminDashboard/>}/>
          </Route>
          
          {/* Admin login route */}
          <Route path="/adminLogin" element={<LoginPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;