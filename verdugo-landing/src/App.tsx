import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";

import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [opaque, setOpaque] = useState(false);

  useEffect(() => {
    AOS.init();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  function handleScroll() {
    const scrollY = window.scrollY;
    const scrollThreshold = 10; // Puedes ajustar este umbral según tus necesidades

    if (scrollY > scrollThreshold) {
      if (!opaque) setOpaque(true);
    } else {
      if (opaque) setOpaque(false);
    }
  };

  return (
    <div className="landing">
      <Navbar opaque={opaque} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/tienda" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
