import styles from "./Home.module.css";

import home from "../../assets/svg/home.svg";
import daily from "../../assets/svg/calendar.svg";
import monthly from "../../assets/svg/contract.svg";
import sale from "../../assets/svg/sale.svg";
import wave from "../../assets/svg/wave.svg";

const cards = [{
  title: "Diario",
  text: "Maneja a todos tus huespedes en un solo lugar",
  img: daily,
},
{
  title: "Mensual",
  text: "Gestiona tus contratos mensuales de manerga ágil y amigable",
  img: monthly,
},
{
  title: "Ventas",
  text: "Registra tus ventas y mantene un control de todos tus ingresos",
  img: sale,
}]

export default function Home() {
  return (
    <div id="home" className={styles.home} >
      <div className={styles.widthContainer}>
        <div className={styles.text} data-aos="fade-right" data-aos-duration="800">
          <h1>Simplificando tu<br></br> Mundo Inmobiliario</h1>
          <span><b>Tu socio confiable, todo en un solo lugar</b></span>
          <br></br>
          <br></br>
          <span>Bienvenido a Gestopia, tu plataforma todo en uno para propiedades, alquileres y ventas. Encuentra, gestiona y prospera con nosotros.</span>
          <a href="https://gestopia.web.app">Iniciar prueba</a>
        </div>
        <div className={styles.img} data-aos="fade-left" data-aos-duration="800">
          <img src={home} alt="home" />
        </div>
        <div className={styles.list}>
          {cards.map((data, i) => (
            <div
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={100 + (i * 200)}
              data-aos-duration="800"
            >
              <img src={data.img} alt="home" />
              <h4>{data.title}</h4>
              <span>{data.text}</span>
            </div>
          ))}
        </div>
      </div>
      <img className={styles.wave} src={wave} alt="" />
    </div>
  )
}
