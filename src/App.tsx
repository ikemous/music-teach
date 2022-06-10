import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import LoggedOutRoute from './components/LoggedOutRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<LoggedOutRoute element={<Login />} forwardRoute="/profile" />} />
          <Route path="register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute element={<Layout />} forwardPath="/login" />}>
            <Route index element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
