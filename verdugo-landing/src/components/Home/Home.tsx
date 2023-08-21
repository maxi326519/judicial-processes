import styles from "./Home.module.css";

import home from "../../assets/img/home.png";

import whatsapp from "../../assets/img/whatsapp.png";

import nissan from "../../assets/img/empresas/nissan.png";
import citroen from "../../assets/img/empresas/citroen.png";
import peugeot from "../../assets/img/empresas/peugeot.png";
import dbAutomobiles from "../../assets/img/empresas/db-automobiles.png";
import opel from "../../assets/img/empresas/opel.png";

import instagramSvg from "../../assets/svg/instagram.svg";
import facebookSvg from "../../assets/svg/facebook.svg";
import twitterSvg from "../../assets/svg/twitter.svg";
import whatsappSvg from "../../assets/svg/whatsapp.svg";

export default function Home() {
  return (
    <div id="home" className={styles.home} >
      <div className={styles.widthContainer}>
        <header>
          <span data-aos="fade-down" data-aos-duration="600">COTIZA CON NUESTROS EXPERTOS</span>
          <div data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
            <div className={styles.circle} >
              <div className={styles.redLines}></div>
            </div>
            <div className={`${styles.circle} ${styles.circle2}`}>
              <div className={styles.redLines}></div>
            </div>
          </div>
        </header>
        <div className={styles.container}>
          <div className={styles.img} data-aos="fade-right" data-aos-duration="1500">
            <img src={home} alt="home" />
          </div>
          <div className={styles.text} data-aos="fade-left" data-aos-duration="1000">
            <div className={styles.title}>
              <h1>ENCUENTRA<br></br>TU REPUESTO</h1>
              <span>AHORA</span>
              <a href="https://web.whatsapp.com/send?l=en&phone=56993204577&text=Hola,%20necesito%20cotizar%20el%20siguiente%20repuesto:" >COTIZÁ</a>
              <img src={whatsapp} alt="whatsapp" />
            </div>
            <br></br>
            <div className={styles.content}>
              <span>Respondemos en minutos!</span>
              <span>Repuestos Originales y Alternativas.</span>
              <span>Expertos en Repuestos hace más de 40 años.</span>
              <span>Envíos a convenir a todo Chile</span>
              <span>Local de ventas a Rodrigo de Araya, 85, San Joaquín, Santiago</span>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.redes}>
            <img src={instagramSvg} alt="instagram" data-aos="fade-up" data-aos-delay="150" data-aos-duration="600" />
            <img src={facebookSvg} alt="facebook" data-aos="fade-up" data-aos-delay="300" data-aos-duration="600" />
            <img src={twitterSvg} alt="twitter" data-aos="fade-up" data-aos-delay="450" data-aos-duration="600" />
            <img src={whatsappSvg} alt="whatsapp" data-aos="fade-up" data-aos-delay="600" data-aos-duration="600" />
          </div>
          <div className={styles.repuestos}>
            <h3>REPUESTOS ORIGINALES</h3>
            <img src={nissan} alt="nissan" />
            <img src={citroen} alt="citroen" />
            <img src={peugeot} alt="peugeot" />
            <img src={dbAutomobiles} alt="dbAutomobiles" />
            <img src={opel} alt="opel" />
          </div>
          <h3>ALTERNATIVAS A TODAS LAS MARCAS</h3>
        </div>
      </div >
    </div >
  )
}
