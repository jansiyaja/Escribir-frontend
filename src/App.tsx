import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/store';

import { SearchProvider } from './Contexts/SearchContext';
import ProtectedRoute from './Components/User/ProtectedRoute';
import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute';

import HomePage from "./Pages/HomePage/HomePage";
import CommonPage from "./Pages/Common/AuthPage";
import UserProfile from './Pages/Profile/UserProfile';
import LoginPage from './Pages/admin/LoginPage';
import Blog from './Pages/BlogProfile/Blog';
import Tags from './Pages/admin/Tags/Tags';
import Dashboard from './Pages/DashBord/Dashboard';
import EditBlogPost from './Pages/BlogProfile/subComponents/EditBlog';
import Report from './Pages/admin/Report/Report';
import Connections from './Pages/DashBord/Connections';
import NotificationPage from './Pages/Common/NotificationPage';
import SinglePage from './Pages/admin/Report/SubComponents/SinglePage';
import Chat from './Pages/Chat/Chat';
import About from './Pages/Common/About';
import Contact from './Pages/Common/Contact';


import './theme.css';
import { ErrorBoundary } from './ErrorBoundary';

import { ROUTES } from './routes/Route';
import NotFound from './Pages/Common/NotFound';
import SettingsPage from './Pages/Settings/SettingsPage';

import PaymentCancelPage from './Pages/Settings/PaymentCancel';
import { PaymentSuccessPageWrapper } from './Pages/Settings/PaymentSuccessPage';
import Layout from './Layout';
import Advertisement from './Pages/Common/Advertisement';
import CreateAd from './Pages/Advertisement/createAd';
import AddBusiness from './Pages/Advertisement/AddBusiness';
import TermsAndConditions from './Pages/Common/Terms&Services';
import  { AddPaymentSuccessWrapper } from './Pages/Advertisement/PaymentSuccess';
import DashBoardAdmin from './Pages/admin/Dashboard';
import Users from './Pages/admin/Users';
import ClientDashboard from './Pages/client/DashBoard';





function App() {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <SearchProvider>
      
        
    
      <div className={` ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route element={<Layout />}>
              <Route path={ROUTES.PUBLIC.REGISTER} element={<CommonPage page="register" />} />
              <Route path={ROUTES.PUBLIC.OTP_VERIFICATION} element={<CommonPage page="otp" />} />
              <Route path={ROUTES.PUBLIC.LOGIN} element={<CommonPage page="login" />} />
             
              <Route path={ROUTES.PUBLIC.ABOUT} element={<About />} />
              <Route path={ROUTES.PUBLIC.CONTACT} element={<Contact />} />
              <Route path={ROUTES.PUBLIC.HOME} element={<HomePage />} />
              <Route path={ROUTES.PUBLIC.ADVERTISEMENT} element={<Advertisement />} />

             
              <Route element={<ProtectedRoute />}>
                
                  <Route path={ROUTES.PROTECTED.SETTINGS} element={<SettingsPage />} />
                  <Route path={ROUTES.PROTECTED.CREATEADD} element={<CreateAd/>}/>
                  <Route path={ROUTES.PROTECTED.BUISNESS} element={<AddBusiness/>}/>
                  <Route path={ROUTES.PROTECTED.TERMS_AND_CONDITION} element={<TermsAndConditions/>}/>
                  <Route path={ROUTES.PROTECTED.ADVERTISEMENT_PAYMENT_SUCESS} element={<AddPaymentSuccessWrapper/>}/>
              
                <Route path={ROUTES.PROTECTED.PAYMENT_SUCCESS} element={<PaymentSuccessPageWrapper />} />
                <Route path={ ROUTES.PROTECTED.PAYMENT_CANCELLED} element={<PaymentCancelPage />} />
                <Route path={ROUTES.PROTECTED.PROFILE} element={<UserProfile />} />
                <Route path={ROUTES.PROTECTED.NOTIFICATIONS} element={<NotificationPage />} />
                <Route path={ROUTES.PROTECTED.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.PROTECTED.CONNECTIONS} element={<Connections />} />
                <Route path={ROUTES.PROTECTED.BLOG_EDITOR} element={<Blog page="blogeditor" />} />
                <Route path={ROUTES.PROTECTED.EDIT_BLOG} element={<EditBlogPost />} />
                <Route path={ROUTES.PROTECTED.SINGLE_BLOG} element={<Blog page="singleblog" />} />
                <Route path={ROUTES.PROTECTED.CHAT} element={<Chat />} />
                <Route path={ROUTES.PROTECTED.CLIENTDASHBOARD} element={<ClientDashboard />} />
              </Route>
           </Route>
            
              <Route element={<AdminProtectedRoute />}>
               
                <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashBoardAdmin />} />
                <Route path={ROUTES.ADMIN.USERS} element={<Users />} />
                <Route path={ROUTES.ADMIN.TAGS} element={<Tags />} />
                <Route path={ROUTES.ADMIN.REPORTS} element={<Report />} />
                <Route path={ROUTES.ADMIN.SINGLE_REPORT} element={<SinglePage />} />
              </Route>
                <Route path={ROUTES.PUBLIC.ADMIN_LOGIN} element={<LoginPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            
          </Router>
        </ErrorBoundary>
        </div>
         
    </SearchProvider>
      
  );
}

export default App;
