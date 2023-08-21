import React from "react";

import TextAreaInput from "../TextareaInput";
import Input from "../Input";

import styles from "./ContactForm.module.css";
import contact from "../../assets/svg/contact.svg";
import whatsapp from "../../assets/svg/whatsapp.svg";
import email from "../../assets/svg/email.svg";

export default function ContactForm() {

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

  }

  return (
    <div id="form" className={styles.form}>
      <h2 data-aos="fade-up" data-aos-duration="800">Contacto</h2>
      <div className={styles.contactForm} data-aos="fade-up" data-aos-duration="800">
        <img src={contact} alt="contact" />
        <div className={styles.contactinfo} >
          <img src={whatsapp} alt="whatsapp" />
          <span>+5493794267780</span>
          <img src={email} alt="email" />
          <span>contacto@gestopia.com</span>
        </div>
        <form>
          <h4>Envianos un mail</h4>
          <Input
            name="name"
            label="Nombre"
            value={""}
            handleChange={handleChange}
          />
          <Input
            name="email"
            label="Email"
            value={""}
            handleChange={handleChange}
          />
          <Input
            name="asunto"
            label="Asunto"
            value={""}
            handleChange={handleChange}
          />
          <TextAreaInput
            name="message"
            label="Mensaje"
            value={""}
            handleChange={handleChange}
          />
          <button className="btn btn-success" type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}
