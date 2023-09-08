import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "../../redux/actions/loading";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import styles from "./ResetEmail.module.css";
import { RootState } from "../../interfaces/ReduxState";

interface NewEmail {
  currentPassword: string;
  email: string;
  repeatEmail: string;
}

interface ErrorEmail {
  currentPassword: string;
  email: string;
  repeatEmail: string;
}

const initNewEmail = {
  currentPassword: "",
  email: "",
  repeatEmail: "",
};

export default function ResetEmail() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login);
  const [newEmail, setNewEmail] = useState<NewEmail>(initNewEmail);
  const [error, setError] = useState<ErrorEmail>(initNewEmail);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
/*     if (validations()) {
      dispatch(openLoading());
      dispatch<any>(changeEmail(newEmail.email, newEmail.currentPassword, user))
        .then(() => {
          redirect("/dashboard/home/procesos");
          dispatch(closeLoading());
          swal("Actualizado", "Se actualozó la contraseña", "success");
        })
        .catch((error: any) => {
          console.log(error);
          dispatch(closeLoading());
          if (error.message.includes("wrong-password")) {
            setError({ ...error, currentPassword: "Contraseña incorrecta" });
          } else if (error.message.includes("email-already-in-use")) {
            setError({ ...error, email: "El correo ya existe" });
          } else {
            swal("Error", "Ocurrió un error desconocido", "error");
          }
        });
    } */
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewEmail({ ...newEmail, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleGoToDasboard() {
    redirect("/dashboard/home/procesos");
  }

  function validations() {
    let error = { ...initNewEmail };
    let value = true;

    if (newEmail.email === "") {
      error.email = "Debes completar este campo";
      value = false;
    }

    if (newEmail.repeatEmail === "") {
      error.repeatEmail = "Debes completar este campo";
      value = false;
    }

    if (newEmail.currentPassword === "") {
      error.currentPassword = "Debes completar este campo";
      value = false;
    }

    if (newEmail.email !== newEmail.repeatEmail) {
      error.email = "Los correos no coinciden";
      error.repeatEmail = "Los correos no coinciden";
      value = false;
    }

    setError(error);
    return value;
  }

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <header className={styles.close}>
          <h4>Cambiar email</h4>
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={handleGoToDasboard}
          >{`>`}</button>
        </header>

        <div className={styles.container}>
          '{/* CURRENT PASSWORD */}
          <div className="form-floating">
            <input
              id="currentPassword"
              className={`form-control ${
                error.currentPassword ? "is-invalid" : ""
              }`}
              name="currentPassword"
              type="password"
              onChange={handleChange}
            />
            <label htmlFor="currentPassword" className="form-label">
              Actual contraseña:
            </label>
            <small>{error.currentPassword}</small>
          </div>
          {/* PASSWORD */}
          <div className="form-floating">
            <input
              id="email"
              className={`form-control ${error.email ? "is-invalid" : ""}`}
              name="email"
              type="email"
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              Nuevo email:
            </label>
            <small>{error.email}</small>
          </div>
          {/* REPEAT PASSWORD */}
          <div className="form-floating">
            <input
              id="repeatEmail"
              className={`form-control ${
                error.repeatEmail ? "is-invalid" : ""
              }`}
              name="repeatEmail"
              type="email"
              onChange={handleChange}
            />
            <label htmlFor="repeatEmail" className="form-label">
              Repetir nuevo email:
            </label>
            <small>{error.repeatEmail}</small>
          </div>
        </div>

        <button className="btn btn-outline-success" type="submit">
          Cambiar
        </button>
      </form>
    </div>
  );
}
