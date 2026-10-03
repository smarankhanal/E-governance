import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Applications from "./pages/Applications";
import Users from "./pages/Users";
import Offices from "./pages/Offices";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Collected from "./pages/Collected";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/appointments" element={<Appointments />} />
        <Route path="/admin/applications" element={<Applications />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/collected" element={<Collected />} />
        <Route path="/admin/offices" element={<Offices />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
