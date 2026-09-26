import React from "react";
import { NavBar, Footer } from "../components";
import { Outlet } from "react-router-dom";
import { ApplicationSessionProvider } from "../Context/ApplicationSessionContext";

export default function MainLayout() {
  return (
    <ApplicationSessionProvider>
      <NavBar />

      <main className="mt-5">
        <Outlet />
      </main>

      <Footer />
    </ApplicationSessionProvider>
  );
}
