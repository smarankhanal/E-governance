import React from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="font-serif">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
