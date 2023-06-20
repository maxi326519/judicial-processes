import { useState, useEffect } from "react";
import {
  ErrorUser,
  UserRol,
  Users,
  initErrorUser,
  initUser,
} from "../../../../../interfaces/users";
import style from "./Form.module.css";
import { generatePassword } from "../../../../../functions/generatePassword";

interface Props {
  editUser: Users | null;
  handleClose: () => void;
  handleSubmit: (user: Users) => void;
}

export default function Form({ editUser, handleClose, handleSubmit }: Props) {
  const [user, setUser] = useState<Users>(initUser);
  const [error, setError] = useState<ErrorUser>(initErrorUser);

  useEffect(() => {
    if (editUser) setUser(editUser);
  }, [editUser]);

  function handlelocalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validations()) {
      handleSubmit(user);
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleLocalClose() {
    handleClose();
  }

  function handleGeneratePassword() {
    setUser({ ...user, password: generatePassword() });
  }

  function validations() {
    let errors: ErrorUser = initErrorUser;
    let value = true;

    /* NAME */
    if (user.name === "") {
      errors.name = "Debes ingresar un nombre";
      value = false;
    }

    /* EMAIL */
    if (user.email === "") {
      errors.email = "Debes ingresar un email";
      value = false;
    }

    /* Password */
    if (user.password === "") {
      errors.password = "Debes ingresar una contraseña";
      value = false;
    }
    setError(errors);
    return value;
  }

  return (
    <div className={style.background}>
      <form className={`toTop ${style.form}`} onSubmit={handlelocalSubmit}>
        <div className={style.close}>
          <h3>{editUser ? "Editar" : "Agregar"} usuario</h3>
          <div className="btn-close" onClick={handleLocalClose} />
        </div>
        <div className={style.flex}>
          {/* ROL */}
          <div className="form-floating">
            <select
              id="rol"
              name="rol"
              className="form-control"
              value={user.rol}
              onChange={handleChange}
            >
              <option value={UserRol.Admin}>Admin</option>
              <option value={UserRol.User}>User</option>
            </select>
            <label htmlFor="rol" className="form-label">
              Rol:
            </label>
          </div>

          {/* NAME: */}
          <div className="form-floating">
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${!error.name ? "" : "is-invalid"}`}
              value={user.name}
              onChange={handleChange}
            />
            <label htmlFor="name" className="form-label">
              Nombre:
            </label>
            {error.name ? <small>{error.name}</small> : null}
          </div>

          {/* E-MAIL */}
          <div className="form-floating">
            <input
              type="text"
              id="email"
              name="email"
              className={`form-control ${!error.email ? "" : "is-invalid"}`}
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            {error.email ? <small>{error.email}</small> : null}
          </div>

          {/* PASSWORD */}
          <div className="form-floating">
            <input
              type="text"
              id="password"
              name="password"
              className={`form-control ${!error.password ? "" : "is-invalid"}`}
              value={user.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            {error.password ? <small>{error.password}</small> : null}

            <button
              className={style.generated}
              type="button"
              onClick={handleGeneratePassword}
            >
              Generar
            </button>
          </div>

          <button type="submit" className="btn btn-success">
            {editUser ? "Guardar" : "Agregar"} usuario
          </button>
        </div>
      </form>
    </div>
  );
}
