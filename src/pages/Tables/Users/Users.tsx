import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../../redux/actions/users";
import { useEffect, useState } from "react";
import { UserRol, Users } from "../../../interfaces/users";
import { AvailableForm } from "./AvailableForm/AvailableForm";
import { RootState } from "../../../interfaces/RootState";

import UsersRow from "./UsersRow/UsersRow";
import Form from "./Form/Form";

import styles from "./Users.module.css";
import loadingSvg from "../../../assets/img/loading.gif";
import errorSvg from "../../../assets/svg/error.svg";
import swal from "sweetalert";
import History from "./History/History";

export default function UsersTable() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const user = useSelector((state: RootState) => state.sesion);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editUser, setEditUser] = useState<Users | null>(null);

  const [history, setHistory] = useState<boolean>(false);
  const [form, setForm] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(false);

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

  function handleHistory() {
    setHistory(!history);
  }

  function handleClose() {
    if (form) setEditUser(null);
    setForm(!form);
  }

  function handleAvailable(user: Users | null) {
    if (!available && user) setEditUser(user);
    setAvailable(!available);
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {history && user.rol === UserRol.Admin && (
        <History onClose={handleHistory} />
      )}
      {form && <Form editUser={editUser} handleClose={handleClose} />}
      {available && (
        <AvailableForm user={editUser} handleClose={handleAvailable} />
      )}
      <header>
        <div className={styles.controls}>
          {user.rol === UserRol.Admin && (
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleHistory}
            >
              Historial de sesiones
            </button>
          )}
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
            <th>Disponibilidad</th>
            <th>Processos</th>
            <th>Tutelas</th>
            <th>Requerimientos</th>
            <th>Poderes</th>
            <th>Conciliaciones</th>
            <th>Acciones</th>
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
                    type="button"
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
                  handleAvailable={handleAvailable}
                />
              ))
            )}
          </div>
        </tbody>
      </table>
    </div>
  );
}
