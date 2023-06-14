import { useState } from "react";

import styles from "./ResetPassword.module.css";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { changePassword } from "../../../redux/actions/users";

interface NewPassword {
  password: string;
  repeatPassword: string;
}

interface ErrorPassword {
  password: string;
  repeatPassword: string;
}

interface Props {
  handleClose: () => void;
}

const initNewPassword = {
  password: "",
  repeatPassword: "",
};

export default function ResetPassword({ handleClose }: Props) {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState<NewPassword>(initNewPassword);
  const [error, setError] = useState<ErrorPassword>(initNewPassword);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validations()) {
      dispatch(openLoading());
      dispatch<any>(changePassword(newPassword.password))
        .then(() => {
          dispatch(closeLoading());
          swal("Actualizado", "Se actualozó la contraseña", "success");
        })
        .catch((error: any) => {
          console.log(error);
          dispatch(closeLoading());
          swal("Actualizado", "Se actualozó la contraseña", "success");
        });
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword({ ...newPassword, [event.target.name]: event.target.value });
  }

  function validations() {
    let value = true;
    if (newPassword.password !== newPassword.repeatPassword) {
      setError({
        password: "Las contraseñas no coinciden",
        repeatPassword: "Las contraseñas no coinciden",
      });
      value = false;
    }
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
