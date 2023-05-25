import { useState } from "react";
import { UserRol, Users, initUser } from "../../../../../interfaces/users";
import style from "./Form.module.css";

interface Props {
  handleClose: () => void;
  handleSubmit: (user: Users) => void;
}

export default function Form({ handleClose, handleSubmit }: Props) {
  const [user, setUser] = useState<Users>(initUser);

  function handlelocalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit(user);
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
    const length = 8;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    setUser({ ...user, password: password });
  }

  return (
    <div className={style.background}>
      <form className={`toTop ${style.form}`} onSubmit={handlelocalSubmit}>
        <div className={style.close}>
          <h3>Agregar usuario</h3>
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
              className="form-control"
              value={user.name}
              onChange={handleChange}
            />
            <label htmlFor="name" className="form-label">
              Nombre:
            </label>
          </div>

          {/* E-MAIL */}
          <div className="form-floating">
            <input
              type="text"
              id="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              Email:
            </label>
          </div>

          {/* PASSWORD */}
          <div className="form-floating">
            <input
              type="text"
              id="password"
              name="password"
              className="form-control"
              value={user.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            <button
              className={style.generated}
              type="button"
              onClick={handleGeneratePassword}
            >
              Generar
            </button>
          </div>

          <button type="submit" className="btn btn-success">
            Agregar usuario
          </button>
        </div>
      </form>
    </div>
  );
}
