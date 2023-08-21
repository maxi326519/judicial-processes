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
    <div id="sistem" className={styles.section}>
      <div className={styles.widthContainer}>
        <h2 data-aos="fade-up" data-aos-duration="800">Nuestro sistema</h2>
        <div className={styles.sistemInfo}>
          <div className={styles.text} data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
            <h4>{sistem[selected].name}</h4>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. In animi, distinctio facere eveniet fugiat id alias facilis rem expedita dolorem explicabo aut. Repudiandae nostrum voluptas explicabo eius, a officiis odit:</span>
            <br></br>
            <br></br>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
            </ul>
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
      </div>
      <div className={styles.colaboradores}>
        <h4>Colaboradores del sistema</h4>
        <div>
          <img src={img1} alt="img" data-aos="fade-up" data-aos-delay="150" data-aos-duration="600" />
          <img src={img1} alt="img" data-aos="fade-up" data-aos-delay="300" data-aos-duration="600" />
          <img src={img1} alt="img" data-aos="fade-up" data-aos-delay="450" data-aos-duration="600" />
          <img src={img1} alt="img" data-aos="fade-up" data-aos-delay="600" data-aos-duration="600" />
        </div>
      </div>
    </div>
  )
}
