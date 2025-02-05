// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import LandingPage from "./components/LandingPage/LandingPage";
import Profile from "./components/Profile/Profile";
import Test from "./components/Test/Test";
import AdminPannel from "./components/AdminPannel/AdminPannel";
import DashboardStats from "./components/DashboardStats/DashboardStats";
import Sportivi from "./components/AdminPannel/raports/Sportivi";
import Centre from "./components/AdminPannel/raports/Centre/Centre";
import Antrenamente from "./components/AdminPannel/raports/Antrenamente";
import AdminRoute from "./components/AdminPannel/AdminRoute";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import CentresList from "./components/AdminPannel/raports/Centre/CentresList";
import CreateCentre from "./components/AdminPannel/raports/Centre/CreateCentre";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext";
import DarkModeSwitcher from "./components/ThemeContext/DarkModeSwitcher";
import CreareOrar from "./components/AdminPannel/raports/Orar/CreareOrar";
import ListaOrar from "./components/AdminPannel/raports/Orar/ListaOrar";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            {/* <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
              <DarkModeSwitcher />
            </header> */}
            <Routes>
              {/* Pagini de bază */}
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/landing" element={<LandingPage />} />

              {/* Dashboard */}
              <Route path="/dashboard" element={<Profile />} />
              <Route path="/test" element={<Test />} />

              {/* Admin Panel Protejat */}
              <Route
                path="/admin/*"
                element={
                  <AdminRoute>
                    <AdminPannel drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
                  </AdminRoute>
                }
              >
                <Route index element={<DashboardStats />} />
                <Route path="sportivi" element={<Sportivi />} />
                <Route path="centre" element={<Centre />} />
                <Route path="antrenamente" element={<Antrenamente />} />
                <Route path="centrelist" element={<CentresList />} />
                <Route path="createcentre" element={<CreateCentre />} />
                <Route path="orar" element={<><CreareOrar /><ListaOrar /></>} />
              </Route>

              {/* Redirect pentru orice altă rută */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
