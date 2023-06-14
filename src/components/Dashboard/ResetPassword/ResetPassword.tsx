import { useState } from "react";

import styles from "./ResetPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { changePassword } from "../../../redux/actions/users";
import { RootState } from "../../../interfaces/RootState";

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

interface Props {
  handleClose: () => void;
}

const initNewPassword = {
  currentPassword: "",
  password: "",
  repeatPassword: "",
};

export default function ResetPassword({ handleClose }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [newPassword, setNewPassword] = useState<NewPassword>(initNewPassword);
  const [error, setError] = useState<ErrorPassword>(initNewPassword);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validations()) {
      dispatch(openLoading());
      dispatch<any>(
        changePassword(newPassword.password, newPassword.currentPassword, user)
      )
      .then(() => {
          handleClose();
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
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword({ ...newPassword, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
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
        <div className={styles.close}>
          <h4>Cambiar contraseña</h4>
          <button
            className="btn btn-close"
            type="button"
            onClick={handleClose}
          />
        </div>

        <div className={styles.container}>
          {/* CURRENT PASSWORD */}
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
              className={`form-control ${
                error.repeatPassword ? "is-invalid" : ""
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
