import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginData, LoginError, initLogin, initLoginError } from "../../interfaces/Login";

import "./Login.module.css";
/* import logo from "../../assets/img/Infotecnik-logo.png"; */

import Input from "../../components/Inputs/Input";

export default function Login() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<LoginError>(initLoginError());
  const [user, setUser] = useState<LoginData>(initLogin());

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setUser({ ...user, [name]: value });
    handleValidations(name, value);
  }

  function handleValidations(name: string, value: string) {
    if (name === "email") {
      setError({ ...error, email: "" });
    } else if (name === "password") {
      setError({ ...error, password: "" });
    }
  }

  function handleSubmit() {

  }

  return (
    <div className="sesion">
      <form className="toLeft" onSubmit={handleSubmit}>
{/*         <div className="header">
          <img src={logo} alt="logo" />
        </div> */}
        <div className="content">
          <Input
            type="email"
            name="email"
            label="Email"
            value={user.email}
            error={error.email}
            handleChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            label="Contraseña"
            value={user.password}
            error={error.password}
            handleChange={handleChange}
          />
          <button className="submit" type="submit">
            Iniciar sesion
          </button>
        </div>
      </form>
    </div>
  );
}
