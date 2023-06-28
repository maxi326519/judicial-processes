import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openLoading, closeLoading } from "../../redux/actions/loading";
import { logIn } from "../../redux/actions/sesion";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import logo from "../../assets/img/logo.png";
import swal from "sweetalert";

interface Error {
  email: string | null;
  password: string | null;
}

const initialError: Error = {
  email: null,
  password: null,
};

export default function Signin() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(initialError);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setUser({ ...user, [name]: value });
    handleValidations(name, value);
  }

  function handleValidations(name: string, value: string) {
    if (name === "email") {
      setError({ ...error, email: null });
    } else if (name === "password") {
      setError({ ...error, password: null });
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (user.email === "" || user.password === "") {
      let err: Error = {
        email: null,
        password: null,
      };
      if (user.email === "") err.email = "Debes ingresar un email";
      if (user.password === "") err.password = "Debes ingresar una contraseña";
      setError(err);
    } else {
      dispatch(openLoading());
      dispatch<any>(logIn(user))
        .then(() => {
          redirect("/dashboard/home");
          dispatch(closeLoading());
        })
        .catch((e: any) => {
          dispatch(closeLoading());
          if (e.message?.includes("invalid-email")) {
            setError({ ...error, email: "El email es invalido" });
          } else if (e.message?.includes("user-not-found")) {
            setError({ ...error, email: "Usuario incorrecto" });
          } else if (e.message?.includes("wrong-password")) {
            setError({ ...error, password: "Contraseña incorrecta" });
          } else {
            console.log(e);
            swal("Error", "Ocurrió un error desconocido", "error");
          }
        });
    }
  }

  return (
    <div className={styles.sesion}>
      <form onSubmit={handleSubmit}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" />
        </div>
        <hr></hr>
        <h2>Iniciar sesión</h2>

        {/* EMAIL */}
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            value={user.email}
            className={`form-control ${!error.email ? "" : "is-invalid"}`}
            id={error.email ? "floatingInputInvalid" : "user"}
            placeholder="name"
            onChange={handleChange}
            /*             required */
          />
          <label htmlFor="floatingInput">Email</label>
          {!error.email ? null : <small>{error.email}</small>}
        </div>

        {/* CONTRASEÑA */}
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            value={user.password}
            className={`form-control ${!error.password ? "" : "is-invalid"}`}
            id={error.password ? "floatingInputInvalid" : "pass"}
            placeholder="Contraseña"
            onChange={handleChange}
            /*             required */
          />
          <label htmlFor="floatingInput">Contraseña</label>
          {!error.password ? null : <small>{error.password}</small>}
        </div>

        <button className="btn btn-primary" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
