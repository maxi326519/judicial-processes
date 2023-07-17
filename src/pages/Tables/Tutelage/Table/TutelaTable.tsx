import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { getLists } from "../../../../redux/actions/Tutelas/lists";
import { getLists as getProsesLists } from "../../../../redux/actions/Processes/lists";
import { UserRol } from "../../../../interfaces/users";
import { getUsers } from "../../../../redux/actions/users";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import {
  deleteTutela,
  getTutelas,
  getTutelaDetails,
  deleteTutelaDetails,
  clearAllTutelas,
  getUserDisabled,
} from "../../../../redux/actions/Tutelas/tutelas";
import {
  TutelaHeads,
  TutelaFilters,
  initTutelaFilters,
} from "../../../../interfaces/Tutelas/data";
import swal from "sweetalert";

import TuelaRow from "./TutelaRow/TutelaRow";
import Form from "./Form/Form";
import Filters from "./FIlters/Filters";
import Lists from "../Lists/Lists";

import styles from "./TutelaTable.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import listSvg from "../../../../assets/svg/list.svg";

export default function TutelaTable() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const users = useSelector((state: RootState) => state.users);
  const tutela = useSelector((state: RootState) => state.tutelas.heads);
  const [filters, setFilters] = useState<TutelaFilters>(initTutelaFilters);
  const [rows, setRows] = useState<TutelaHeads[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    if (tutela.length === 0) handleGetTutelas();
    if (users.length === 0) handleGetUsers();
  }, []);

  useEffect(() => {
    const filter = tutela.filter((data: TutelaHeads) => {
      if (
        filters.idSiproj ||
        filters.nroTutela ||
        filters.abogado ||
        filters.temaTutela ||
        filters.demandanteId ||
        filters.demandante ||
        filters.derechoVulnerado
      ) {
        /* ABOGADO */
        if (filters.abogado && filters.abogado !== data.abogado) return false;

        /* ID SIPROJ */
        if (
          filters.idSiproj &&
          !data.idSiproj.toString().startsWith(filters.idSiproj.toString())
        )
          return false;

        /* NRO TUTELA */
        if (
          filters.nroTutela &&
          !data.nroTutela.toString().startsWith(filters.nroTutela.toString())
        ) {
          return false;
        }

        /* TEMA TUTELA */
        if (
          filters.nroTutela &&
          !data.temaTutela.toString().startsWith(filters.temaTutela.toString())
        ) {
          return false;
        }

        /* DEMANDANTE ID */
        if (
          filters.demandanteId &&
          !data.demandanteId
            .toString()
            .startsWith(filters.demandanteId.toString())
        ) {
          return false;
        }

        /* DEMANDANTE */
        if (
          filters.demandante &&
          !data.demandante.includes(filters.demandante.toUpperCase())
        ) {
          return false;
        }

        /* ID DEMANDANTE */
        if (
          filters.nroTutela &&
          !data.demandanteId
            .toString()
            .startsWith(filters.demandanteId.toString())
        ) {
          return false;
        }
        return true;
      } else return true;
    });
    setRows(filter);
  }, [tutela, filters]);

  function handleGetTutelas() {
    setLoading(true);
    setError(false);

    Promise.all([
      dispatch<any>(getProsesLists()),
      dispatch<any>(getLists()),
      dispatch<any>(getTutelas(user)),
      dispatch<any>(getUserDisabled()),
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

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

  function handleDelete(tutela: TutelaHeads) {
    swal({
      text: "¿Seguro que desea eliminar esta tutela?",
      icon: "warning",
      buttons: {
        Aceptar: true,
        Cancelar: true,
      },
    }).then((response: any) => {
      console.log(response);
      if (response === "Aceptar") {
        dispatch(openLoading());
        dispatch<any>(deleteTutela(tutela.id!))
          .then(() => {
            dispatch(closeLoading());
            swal("Eliminado", "Se eliminó correctamente la tutela", "success");
          })
          .catch((err: any) => {
            dispatch(closeLoading());
            console.log(err);
            swal(
              "Error",
              "No se pudo eliminar este tutela, intentelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleClearTutelas() {
    swal({
      text: "¿Seguro que desea eliminar toda la base de datos de tutelas?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      if (response === "Si") {
        dispatch(openLoading());
        dispatch<any>(clearAllTutelas())
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Eliminados",
              "Se eliminaron todas las tutelas existentes",
              "success"
            );
          })
          .catch((error: any) => {
            console.log(error);
            dispatch(closeLoading());
            swal(
              "Error",
              "No se pudieron eliminar las tutelas, inténtelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleEdit(idSiproj: string) {
    dispatch(openLoading());
    dispatch<any>(getTutelaDetails(idSiproj))
      .then(() => {
        dispatch(closeLoading());
        setForm(true);
      })
      .catch((error: any) => {
        dispatch(closeLoading());
        console.log(error);
        swal(
          "Error",
          "Hubo un error al cargar la tutela, intentelo mas tarde",
          "error"
        );
      });
  }

  function handleClose() {
    setForm(!form);
    if (form) {
      dispatch(deleteTutelaDetails());
    }
  }

  function handleShowList() {
    setList(!list);
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? <Form handleClose={handleClose} /> : null}
      {list ? <Lists handleClose={handleShowList} /> : null}
      <div className={styles.controls}>
        <Filters filters={filters} setFilters={setFilters} />
        {user.rol === UserRol.Admin && (
          <div>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleShowList}
            >
              <img src={listSvg} alt="list" />
              <span>Listas</span>
            </button>
            <button
              className={`btn btn-outline-danger ${styles.clear}`}
              type="button"
              onClick={handleClearTutelas}
            >
              X <span>Eliminar todas las tutelas</span>
            </button>
          </div>
        )}
        {user.rol === UserRol.Admin && (
          <div>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleClose}
            >
              + Nueva tutela
            </button>
          </div>
        )}
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.row} ${styles.firstRow}`}>
            <th>ID Siproj</th>
            <th>Nro de tutela</th>
            <th>abogado</th>
            <th>Tema tutela</th>
            <th>ID Demandante</th>
            <th>Demandante</th>
            <th>Derecho vulnerado</th>
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
                <span>No se pudo cargar las tutelas</span>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleGetTutelas}
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
            {rows.length <= 0 ? (
              <tr className={styles.emptyRows}>
                <th>No hay tutelas</th>
              </tr>
            ) : (
              rows?.map((tutela: TutelaHeads) => (
                <TuelaRow
                  key={tutela.id}
                  tutela={tutela}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </tbody>
        <div className={styles.footer}>
          <span>{rows.length} Documentos</span>
        </div>
      </table>
    </div>
  );
}
