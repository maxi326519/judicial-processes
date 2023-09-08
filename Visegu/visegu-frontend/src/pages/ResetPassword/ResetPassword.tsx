import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "../../redux/actions/loading";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import styles from "./ResetPassword.module.css";
import { RootState } from "../../interfaces/ReduxState";

interface NewPassword {
  currentPassword: string;
  password: string;
  repeatPassword: string;
}

interface ErrorPassword {
  currentPassword: string;
  password: string;
  repeatPassword: string;
}

const initNewPassword = {
  currentPassword: "",
  password: "",
  repeatPassword: "",
};

export default function ResetPassword() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login);
  const [newPassword, setNewPassword] = useState<NewPassword>(initNewPassword);
  const [error, setError] = useState<ErrorPassword>(initNewPassword);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    /*     if (validations()) {
          dispatch(openLoading());
          dispatch<any>(
            changePassword(newPassword.password, newPassword.currentPassword, user)
          )
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
              } else {
                swal("Error", "Ocurrió un error desconocido", "error");
              }
            });
        } */
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword({ ...newPassword, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleGoToDasboard() {
    redirect("/dashboard/home/procesos");
  }

  function validations() {
    let error = { ...initNewPassword };
    let value = true;

    if (newPassword.currentPassword === "") {
      error.currentPassword = "Debes completar este campo";
      value = false;
    }

    if (newPassword.password === "") {
      error.password = "Debes completar este campo";
      value = false;
    }

    if (newPassword.repeatPassword === "") {
      error.repeatPassword = "Debes completar este campo";
      value = false;
    }

    if (newPassword.password !== newPassword.repeatPassword) {
      error.password = "Las contraseñas no coinciden";
      error.repeatPassword = "Las contraseñas no coinciden";
      value = false;
    }

    setError(error);
    return value;
  }

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <header className={styles.close}>
          <h4>Cambiar contraseña</h4>
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={handleGoToDasboard}
          >{`>`}</button>
        </header>

        <div className={styles.container}>
          {/* CURRENT PASSWORD */}
          <div className="form-floating">
            <input
              id="currentPassword"
              className={`form-control ${error.currentPassword ? "is-invalid" : ""
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
              id="password"
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              name="password"
              type="password"
              onChange={handleChange}
            />
            <label htmlFor="password" className="form-label">
              Nueva contraseña:
            </label>
            <small>{error.password}</small>
          </div>
          {/* REPEAT PASSWORD */}
          <div className="form-floating">
            <input
              id="repeatPassword"
              className={`form-control ${error.repeatPassword ? "is-invalid" : ""
                }`}
              name="repeatPassword"
              type="password"
              onChange={handleChange}
            />
            <label htmlFor="repeatPassword" className="form-label">
              Repetir nueva contraseña:
            </label>
            <small>{error.repeatPassword}</small>
          </div>
        </div>

        <button className="btn btn-outline-success" type="submit">
          Cambiar
        </button>
      </form>
    </div>
  );
}
