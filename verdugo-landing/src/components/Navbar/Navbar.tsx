
import styles from "./Navbar.module.css";
import logo from "../../assets/img/logo.png";

interface Props {
  opaque: boolean;
}

export default function Navbar({ opaque }: Props) {
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
          <li data-aos="fade-down" data-aos-delay="100" data-aos-duration="600"><a href="/">COTIZA</a></li>
          <li data-aos="fade-down" data-aos-delay="200" data-aos-duration="600"><a href="/nosotros">NOSOTROS</a></li>
          <li data-aos="fade-down" data-aos-delay="300" data-aos-duration="600"><a href="/tienda">TIENDA</a></li>
        </ul>
      </div>
    </div>
  )
}
