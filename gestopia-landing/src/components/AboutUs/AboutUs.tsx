import styles from "./AboutUs.module.css";

import aboutUs from "../../assets/svg/aboutUs.svg";
import wave from "../../assets/svg/white-wave.svg";

export default function AboutUs() {
  return (
    <div id="about" className={styles.about}>
      <h2 data-aos="fade-up" data-aos-duration="600">Sobre nosotros</h2>
      <div className={styles.container}>
        <div className={styles.imgContainer} data-aos="fade-right" data-aos-duration="800">
          <img src={aboutUs} alt="about us" />
        </div>
        <div className={styles.text} data-aos="fade-left" data-aos-duration="800">
          <div>
            <h5>Nosotros</h5>
            <span>Somos una empresa jovén y en constante desarrollo, ofreciendo soluciones simples para optimizar tu gestión y trabajo</span>
          </div>
          <div>
            <h5>Nuestra Misión</h5>
            <span>En Gestopia, creemos que cada propiedad merece una gestión sencilla y eficiente. Nuestra plataforma está diseñada para simplificar todos los aspectos de la administración de inmuebles, brindándote el control que necesitas con un solo clic</span>
          </div>
          <div>
            <h5>Tu Feedback es vital</h5>
            <span>En Gestopia, valoramos tu opinión. Estamos comprometidos a escuchar tus sugerencias y comentarios para mejorar constantemente nuestras soluciones. Tu experiencia es nuestra guía, y juntos estamos creando una plataforma que se adapta a tus necesidades. </span>
          </div>
        </div>
      </div>
      <img className={styles.wave} src={wave} alt="" />
    </div>
  )
}
