import React from "react";
import { NavBar, Footer } from "../components";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="mt-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
