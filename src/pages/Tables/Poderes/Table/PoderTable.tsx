import { getLists as getProsesLists } from "../../../../redux/actions/Processes/lists";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { useEffect } from "react";
import { getLists } from "../../../../redux/actions/Poderes/lists";
import { getUsers } from "../../../../redux/actions/users";
import { useState } from "react";
import { UserRol } from "../../../../interfaces/users";
import {
  deletePoder,
  getPoderes,
  getPoderDetails,
  deletePoderDetails,
  clearAllPoderes,
  getUserDisabled,
} from "../../../../redux/actions/Poderes/poderes";
import {
  initPoderesFilters,
  PoderesFilters,
  PoderesHeads,
} from "../../../../interfaces/Poderes/data";
import swal from "sweetalert";

import Form from "./Form/Form";
import Filters from "./FIlters/Filters";
import Lists from "../Lists/Lists";
import PoderRow from "./PoderRow/PoderRow";

import styles from "./PoderTable.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import listSvg from "../../../../assets/svg/list.svg";

export default function PoderTable() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const users = useSelector((state: RootState) => state.users);
  const poder = useSelector((state: RootState) => state.poderes.heads);
  const [filters, setFilters] = useState<PoderesFilters>(initPoderesFilters());
  const [rows, setRows] = useState<PoderesHeads[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    if (poder.length === 0) handleGetPoderes();
    if (users.length === 0) handleGetUsers();
  }, []);

  useEffect(() => {
    const filter = poder.filter((data: PoderesHeads) => {
      if (
        filters.abogado ||
        filters.radicadoSipa ||
        filters.concepto ||
        filters.accionante
      ) {
        /* ABOGADO */
        if (filters.abogado && filters.abogado !== data.abogado) return false;

        /* RADICADO SIPA */
        if (
          filters.radicadoSipa &&
          !data.radicadoSipa
            .toString()
            .startsWith(filters.radicadoSipa.toString())
        )
          return false;

        /* CONCEPTO */
        if (
          filters.concepto &&
          !data.concepto.toString().startsWith(filters.concepto.toString())
        ) {
          return false;
        }

        /* ACCIONANDO */
        if (
          filters.accionante &&
          !data.accionante
            .toString()
            .startsWith(filters.accionante.toUpperCase())
        ) {
          return false;
        }
        return true;
      } else return true;
    });

    setRows(filter);
  }, [poder, filters]);

  function handleGetPoderes() {
    setLoading(true);
    setError(false);

    Promise.all([
      dispatch<any>(getProsesLists()),
      dispatch<any>(getLists()),
      dispatch<any>(getPoderes(user)),
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

  function handleDelete(poder: PoderesHeads) {
    swal({
      text: "¿Seguro que desea eliminar esta poder?",
      icon: "warning",
      buttons: {
        Aceptar: true,
        Cancelar: true,
      },
    }).then((response: any) => {
      console.log(response);
      if (response === "Aceptar") {
        dispatch(openLoading());
        dispatch<any>(deletePoder(poder.id!))
          .then(() => {
            dispatch(closeLoading());
            swal("Eliminado", "Se eliminó correctamente la poder", "success");
          })
          .catch((err: any) => {
            dispatch(closeLoading());
            console.log(err);
            swal(
              "Error",
              "No se pudo eliminar este poder, intentelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleClearPoderes() {
    swal({
      text: "¿Seguro que desea eliminar toda la base de datos de poderes?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      if (response === "Si") {
        dispatch(openLoading());
        dispatch<any>(clearAllPoderes())
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Eliminados",
              "Se eliminaron todas las poderes existentes",
              "success"
            );
          })
          .catch((error: any) => {
            console.log(error);
            dispatch(closeLoading());
            swal(
              "Error",
              "No se pudieron eliminar las poderes, inténtelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleEdit(idSiproj: string) {
    dispatch(openLoading());
    dispatch<any>(getPoderDetails(idSiproj))
      .then(() => {
        dispatch(closeLoading());
        setForm(true);
      })
      .catch((error: any) => {
        dispatch(closeLoading());
        console.log(error);
        swal(
          "Error",
          "Hubo un error al cargar la poder, intentelo mas tarde",
          "error"
        );
      });
  }

  function handleClose() {
    setForm(!form);
    if (form) {
      dispatch(deletePoderDetails());
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
              onClick={handleClearPoderes}
            >
              X <span>Eliminar todas las poderes</span>
            </button>
          </div>
        )}
        {user.rol === UserRol.Admin && (
          <div>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleClose}
              disabled={loading}
            >
              + Nuevo poder
            </button>
          </div>
        )}
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.row} ${styles.firstRow}`}>
            <th>Radicado SIPA</th>
            <th>Abogado</th>
            <th>Concepto</th>
            <th>Accionante</th>
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
                <span>No se pudo cargar las poderes</span>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleGetPoderes}
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
                <th>No hay poderes</th>
              </tr>
            ) : (
              rows?.map((poder: PoderesHeads) => (
                <PoderRow
                  key={poder.id}
                  poder={poder}
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
