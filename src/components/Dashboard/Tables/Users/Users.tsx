import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import {
  deleteUser,
  getUsers,
  setUser,
  updateUser,
} from "../../../../redux/actions/users";
import { Users } from "../../../../interfaces/users";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import swal from "sweetalert";

import UsersRow from "./UsersRow/UsersRow";
import Form from "./Form/Form";

import styles from "./Users.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";

export default function UsersTable() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editUser, setEditUser] = useState<Users | null>(null);

  useEffect(() => {
    if (users.length === 0) {
      handleGetUsers();
    }
  }, []);

  function handleGetUsers() {
    setLoading(true);
    setError(false);
    dispatch<any>(getUsers())
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  function handleEdit(user: Users) {
    setEditUser(user);
    handleClose();
  }

  function handleDelete(id: string) {
    swal({
      text: "¿Seguro que desea eliminar a este usuario?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      if (response === "Si") {
        dispatch(openLoading());
        dispatch<any>(deleteUser(id))
          .then(() => {
            dispatch(closeLoading());
            swal("Eliminado", "Se eliminó el usuario con exito", "success");
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal("Error", "No se pudo eliminar el usuario", "error");
          });
      }
    });
  }

  function handleSaveUser(user: Users) {
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

  function handleClose() {
    if (form) setEditUser(null);
    setForm(!form);
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? (
        <Form
          editUser={editUser}
          handleClose={handleClose}
          handleSubmit={handleSaveUser}
        />
      ) : null}
      <header>
        <div className={styles.controls}>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleClose}
          >
            + Nuevo usuario
          </button>
        </div>
      </header>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.row} ${styles.firstRow}`}>
            <th>Nombre</th>
            <th>E-mail</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody className={styles.contentRows}>
          <div>
            {loading ? (
              <div className={styles.loading}>
                <img src={loadingSvg} alt="loading" />
              </div>
            ) : null}
            {error ? (
              <div className={styles.error}>
                <img src={errorSvg} alt="error" />
                <span>No se pudo cargar los usuarios</span>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleGetUsers}
                  >
                    Recargar
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => setError(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : null}
            {users.length <= 0 ? (
              <tr className={styles.emptyRows}>
                <th>No hay usuario</th>
              </tr>
            ) : (
              users?.map((user: Users, i) => (
                <UsersRow
                  key={i}
                  user={user}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </tbody>
      </table>
    </div>
  );
}
