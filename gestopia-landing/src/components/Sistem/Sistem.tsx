import { useState } from "react";

import styles from "./Sistem.module.css";
import daily from "../../assets/img/alquileres-diarios.png"
import monthly from "../../assets/img/alquileres-mensuales.png"
import sale from "../../assets/img/ventas.png"
import img1 from "../../assets/img/cooperadores/LOGO LA ESCALA.png";

const sistem = [
  {
    name: "Diarios",
    img: daily
  },
  {
    name: "Mensuales",
    img: monthly
  },
  {
    name: "Ventas",
    img: sale
  }
]

export default function Sistem() {
  const [selected, setSelected] = useState(0);

  function handleSelectSistem(index: number) {
    setSelected(index);
  }

  return (
    <div id="section1" className={styles.section}>
      <h2 data-aos="fade-down" data-aos-duration="800">Sistema</h2>
      <div className={styles.sistemInfo}>
        <div className={styles.text} data-aos="fade-right" data-aos-duration="800">
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. In animi, distinctio facere eveniet fugiat id alias facilis rem expedita dolorem explicabo aut. Repudiandae nostrum voluptas explicabo eius, a officiis odit!</span>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. In animi, distinctio facere eveniet fugiat id alias facilis rem expedita dolorem explicabo aut. Repudiandae nostrum voluptas explicabo eius, a officiis odit!</span>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. In animi, distinctio facere eveniet fugiat id alias facilis rem expedita dolorem explicabo aut. Repudiandae nostrum voluptas explicabo eius, a officiis odit!</span>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. In animi, distinctio facere eveniet fugiat id alias facilis rem expedita dolorem explicabo aut. Repudiandae nostrum voluptas explicabo eius, a officiis odit!</span>
        </div>
        <div className={styles.imgContainer} data-aos="fade-left" data-aos-duration="800">
          <img src={sistem[selected].img} alt="sistem-img" />
        </div>
      </div>
      <div className={styles.controls}>
        <button className={selected === 0 ? styles.selected : ""} type="button" onClick={() => handleSelectSistem(0)}>.</button>
        <button className={selected === 1 ? styles.selected : ""} type="button" onClick={() => handleSelectSistem(1)}>.</button>
        <button className={selected === 2 ? styles.selected : ""} type="button" onClick={() => handleSelectSistem(2)}>.</button>
      </div>
      <div className={styles.cooperadores}>
        <h4>Colaboradores del sistema</h4>
        <div>
          <img src={img1} alt="img" data-aos="fade-up" data-aos-delay="200" data-aos-duration="600" />
          <img src={img1} alt="img" data-aos="fade-up" data-aos-delay="400" data-aos-duration="600" />
          <img src={img1} alt="img" data-aos="fade-up" data-aos-delay="600" data-aos-duration="600" />
          <img src={img1} alt="img" data-aos="fade-up" data-aos-delay="800" data-aos-duration="600" />
        </div>
      </div>
    </div>
  )
}
