import React from "react";

import Login from "./pages/Auth/Login";
import Sign from "./pages/Auth/Sign";
import PassportStatus from "./pages/PassportStatus";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import ScrollToTop from "./components/Common/ScrollToTop";
import PassportType from "./pages/PassportType";
import FAQ from "./pages/FAQ";
import PassportForm from "./pages/PassportForm";
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ==================== MAIN WEBSITE ==================== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reprint/application" element={<PassportStatus />} />
          <Route
            path="/application/pre-enrollment-home"
            element={<PassportType />}
          />
          <Route
            path="/application/integrated-enrollment"
            element={<PassportForm />}
          />
          <Route path="/faq" element={<FAQ />} />
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
