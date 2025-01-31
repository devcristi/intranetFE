import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar'; // Correct import
import Profile from './components/Profile/Profile';
import DashboardLayoutNoToolpad from './components/Profile/Profile';
import Test from './components/Test/Test';
import AdminPannel from './components/AdminPannel/AdminPannel';
import DashboardStats from './components/DashboardStats/DashboardStats';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<DashboardLayoutNoToolpad />} />
          <Route path="/test" element={<Test />} />
          <Route path="/admin" element={<AdminPannel />} />
          <Route path="/dashboardstats" element={<DashboardStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;