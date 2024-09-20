
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage/HomePage";
import ProtectedRoute from './Components/ProtectedRoute';
import CommonPage from "./Pages/AuthPage";
import UserProfile from './Pages/Profile/UserProfile';


function App() {
  return (
    <>
 
      <Router>
        <Routes>
          <Route path="/register" element={<CommonPage page="register" />} />
          <Route path="/OTP-Verification" element={<CommonPage page="otp" />}  />
          <Route path="/login" element={<CommonPage page="login" />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
         
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
