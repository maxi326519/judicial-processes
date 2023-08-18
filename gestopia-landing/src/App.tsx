import React, { useEffect, useState } from "react";
import AOS from "aos";

import AboutUs from "./components/AboutUs/AboutUs";
import ContactForm from "./components/ContactForm/ContactForm";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sistem from "./components/Sistem/Sistem";
import Section2 from "./components/Section2/Section2";

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
    const scrollThreshold = 100; // Puedes ajustar este umbral según tus necesidades

    if (scrollY > scrollThreshold) {
      console.log("Opaco");
      if(!opaque) setOpaque(true);
    } else {
      console.log("transparente");
      if(opaque) setOpaque(false);
    }
  };

  return (
    <div className="landing">
      <Navbar opaque={opaque}/>
      <Home />
      <AboutUs />
      <Sistem />
{/*       <Section2 /> */}
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
