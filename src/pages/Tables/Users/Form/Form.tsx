import { useState, useEffect } from "react";
import { generatePassword } from "../../../../functions/generatePassword";
import { setUser, updateUser } from "../../../../redux/actions/users";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { useDispatch } from "react-redux";
import {
  ErrorUser,
  UserRol,
  Users,
  initErrorUser,
  initUser,
} from "../../../../interfaces/users";
import swal from "sweetalert";

import Input from "../../../../components/Inputs/Input";
import SelectInput from "../../../../components/Inputs/SelectInput";
import Checkbox from "../../../../components/Inputs/Checkbox";

import style from "./Form.module.css";

interface Props {
  editUser: Users | null;
  handleClose: () => void;
}

export default function Form({ editUser, handleClose }: Props) {
  const dispatch = useDispatch();
  const [user, setUserData] = useState<Users>({ ...initUser });
  const [error, setError] = useState<ErrorUser>({ ...initErrorUser });

  useEffect(() => {
    if (editUser) setUserData(editUser);
  }, [editUser]);

  function handlelocalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (handleValidations()) {
      console.log(user);
      dispatch(openLoading());
      dispatch<any>(editUser ? updateUser(user) : setUser(user))
        .then(() => {
          handleClose();
          dispatch(closeLoading());
          swal("Guardado", "Se guardo el usuario", "success");
        })
        .catch((err: any) => {
          console.log(err);
          dispatch(closeLoading());
          swal(
            "Error",
            "No se pudo guardar el usuario, inténtelo más tarde",
            "error"
          );
        });
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    console.log(user);
    setUserData({ ...user, [event.target.name]: event.target.value });
  }

  function handlePermissions(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({
      ...user,
      permissions: {
        ...user.permissions,
        [event.target.name]: event.target.checked,
      },
    });
  }

  function handleLocalClose() {
    handleClose();
  }

  function handleGeneratePassword() {
    setUserData({ ...user, password: generatePassword() });
  }

  function handleValidations() {
    let errors: ErrorUser = initErrorUser;
    let value = true;

    /* ROL */
    if (user.rol === UserRol.Any) {
      errors.rol = "Debes seleccionar un rol";
      value = false;
    }

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
          <SelectInput
            name={"rol"}
            value={user.rol}
            label={"Rol"}
            error={error.rol}
            list={[UserRol.Admin, UserRol.User]}
            handleChange={handleChange}
          />
          <Input
            name={"name"}
            value={user.name}
            label={"Nombre"}
            error={error.name}
            handleChange={handleChange}
          />
          <Input
            name={"email"}
            value={user.email}
            label={"Email"}
            type={"email"}
            error={error.email}
            handleChange={handleChange}
          />

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
          <div
            className={`${style.permissions} ${
              user.rol === UserRol.User && style.showPermissions
            }`}
          >
            <h5>Permisos</h5>
            <Checkbox
              name={"processes"}
              value={user.permissions?.processes}
              label={"Procesos"}
              handleCheck={handlePermissions}
            />
            <Checkbox
              name={"tutelas"}
              value={user.permissions?.tutelas}
              label={"Tutelas"}
              handleCheck={handlePermissions}
            />
            <Checkbox
              name={"requirements"}
              value={user.permissions?.requirements}
              label={"Requerimientos"}
              handleCheck={handlePermissions}
            />
          </div>
          <button type="submit" className="btn btn-success">
            {editUser ? "Guardar" : "Agregar"} usuario
          </button>
        </div>
      </form>
    </div>
  );
}
