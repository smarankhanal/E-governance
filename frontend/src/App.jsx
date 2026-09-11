import React from "react";

import Login from "./pages/Auth/Login";
import Sign from "./pages/Auth/Sign";
import ApplicationStatus from "./pages/ApplicationStatus";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import ScrollToTop from "./components/Common/ScrollToTop";
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ==================== MAIN WEBSITE ==================== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reprint/application" element={<ApplicationStatus />} />
        </Route>
        {/* ==================== AUTHENTICATION ==================== */}
        <Route element={<AuthLayout />}>
          <Route path="/account/Register" element={<Sign />} />
          <Route path="/account/SignIn" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}
