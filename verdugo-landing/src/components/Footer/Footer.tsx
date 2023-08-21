import styles from "./Footer.module.css";
import logo from "../../assets/img/icon.png";
import whatsapp from "../../assets/svg/whatsapp.svg";
import email from "../../assets/svg/email.svg";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <a href="">Informacion legal</a>
          <a href="">Politicas de privacidad</a>
        </div>
        <div className={styles.contact}>
          <h5>Contacto</h5>
          <img src={whatsapp} alt="whatsapp" />
          <span>+5493794267780</span>
          <img src={email} alt="email" />
          <span>contacto@gestopia.com</span>
        </div>
      </div>
      <div className={styles.copyright}>© 2023 <b>Gestopia </b>- Todos los Derechos Reservados</div>
    </div>
  )
}
