import React from "react";
import Input from "../Input";
import styles from "./ContactForm.module.css";
import TextAreaInput from "../TextareaInput";

export default function ContactForm() {

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

  }

  return (
    <div id="form" className={styles.form}>
      <div className={styles.widthContainer}>
        <h2>Contacto</h2>
        <div className={styles.contactinfo}>
          <span>Correo</span>
          <span>Telefono</span>
        </div>
        <div className={styles.contactForm}>
          <form>
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
    </div>
  )
}
