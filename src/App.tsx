import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import LoggedOutRoute from './components/LoggedOutRoute';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import AccountSetup from './pages/AccountSetup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          {/* <Route path="temp-profile-page" element={<Profile />} /> */}
          <Route 
            path="login" 
            element={
              <LoggedOutRoute element={<Login />} forwardRoute="/profile" />
            } 
          />
          <Route 
            path="register" 
            element={
              <LoggedOutRoute element={<Register />} forwardRoute="/profile" />
            } 
          />
          <Route 
            path="forgot-password" 
            element={
              <LoggedOutRoute element={<ForgotPassword />} forwardRoute="/profile" />
            } 
          />
          <Route 
            path="verify-email" 
            element={
              <ProtectedRoute element={<VerifyEmail />} forwardPath="/login" />
            } 
          />
          <Route 
            path="account-setup" 
            element={
              <ProtectedRoute element={<AccountSetup />} forwardPath="/login" />
            } 
          />
          <Route path="profile" element={<ProtectedRoute element={<Layout />} forwardPath="/login" />}>
            <Route index element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
