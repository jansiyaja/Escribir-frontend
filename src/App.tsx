import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage/HomePage";
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/User/ProtectedRoute';
import CommonPage from "./Pages/Common/AuthPage";
import UserProfile from './Pages/Profile/UserProfile';
import { RootState } from './redux/store/store';
import './theme.css';
import LoginPage from './Pages/admin/LoginPage';
import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute';
import AdminDashboard from './Pages/admin/AdminDashBoard';
import Blog from './Pages/BlogProfile/Blog';
import Tags from './Pages/admin/Tags/Tags';
import Dashboard from './Pages/DashBord/Dashboard';
import EditBlogPost from './Pages/BlogProfile/subComponents/EditBlog';
import Report from './Pages/admin/Report/Report';
import Connections from './Pages/DashBord/Connections';
import NotificationPage from './Pages/Common/NotificationPage';
import SinglePage from './Pages/admin/Report/SubComponents/SinglePage';
import Chat from './Pages/Chat/Chat';
import { NotificationProvider } from './Contexts/NotificationContext';


function App() {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <NotificationProvider> 
      <div className={darkMode ? 'dark bg-black text-white' : 'bg-white text-black'}>
        <Router>
          <Routes>
            <Route path="/register" element={<CommonPage page="register" />} />
            <Route path="/OTP-Verification" element={<CommonPage page="otp" />} />
            <Route path="/login" element={<CommonPage page="login" />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/connections/:authorId" element={<Connections />} />
              <Route path='/blog' element={<Blog page='blogeditor' />} />
              <Route path='/editblog/:id' element={<EditBlogPost />} />
              <Route path="/singleblog/:id" element={<Blog page='singleblog' />} />
              <Route path='/Chat' element={<Chat />} />
            </Route>

            <Route element={<AdminProtectedRoute />}>
              <Route path='/adminDashBord' element={<AdminDashboard />} />
              <Route path='/tagList' element={<Tags />} />
              <Route path='/repotedList' element={<Report />} />
              <Route path="/single/:id" element={<SinglePage />} />
            </Route>

            <Route path="/adminLogin" element={<LoginPage />} />
          </Routes>
        </Router>
      </div>
    </NotificationProvider>
  );
}

export default App;
