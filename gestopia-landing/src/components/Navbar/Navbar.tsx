
import styles from "./Navbar.module.css";
import logo from "../../assets/img/logo-banner.png";
import { useEffect } from "react";

interface Props {
  opaque: boolean;
}

export default function Navbar({ opaque }: Props) {
  
  useEffect(() =>{
    console.log(opaque);
  }, []);

  return (
    <div className={`${styles.navbar} ${opaque ? styles.opaque : ""}`}>
      <div className={styles.container}>
        <div
          className={styles.logo}
          data-aos="fade-down"
          data-aos-duration="400"
        >
          <img src={logo} alt="logo" />
        </div>
        <ul className={styles.menu}>
          <li data-aos="fade-down" data-aos-delay="150" data-aos-duration="400"><a href="#home">Home</a></li>
          <li data-aos="fade-down" data-aos-delay="300" data-aos-duration="400"><a href="#about">Sobre nosotros</a></li>
          <li data-aos="fade-down" data-aos-delay="300" data-aos-duration="400"><a href="#section1">Sistema</a></li>
          <li data-aos="fade-down" data-aos-delay="450" data-aos-duration="400"><a href="#form">Contacto</a></li>
        </ul>
        <ul className={styles.sesion}>
          <li data-aos="fade-down" data-aos-delay="600" data-aos-duration="400"><a href="https://gestopia.web.app">Iniciar sesión</a></li>
          <li data-aos="fade-down" data-aos-delay="750" data-aos-duration="400"><a href="https://gestopia.web.app">Registrarse</a></li>
        </ul>
      </div>
    </div>
  )
}
