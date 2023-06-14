import { useState } from "react";

import styles from "./ResetEmail.module.css";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { changeEmail } from "../../../redux/actions/users";

interface NewEmail {
  email: string;
  repeatEmail: string;
}

interface ErrorEmail {
  email: string;
  repeatEmail: string;
}

interface Props {
  handleClose: () => void;
}

const initNewEmail = {
  email: "",
  repeatEmail: "",
};

export default function ResetEmail({ handleClose }: Props) {
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState<NewEmail>(initNewEmail);
  const [error, setError] = useState<ErrorEmail>(initNewEmail);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validations()) {
      dispatch(openLoading());
      dispatch<any>(changeEmail(newEmail.email))
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
    setNewEmail({ ...newEmail, [event.target.name]: event.target.value });
  }

  function validations() {
    let value = true;
    if (newEmail.email !== newEmail.repeatEmail) {
      setError({
        email: "Las contraseñas no coinciden",
        repeatEmail: "Las contraseñas no coinciden",
      });
      value = false;
    }
    return value;
  }

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.close}>
          <h4>Cambiar email</h4>
          <button className="btn btn-close" type="button" onClick={handleClose}/>
        </div>

        <div className={styles.container}>
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
