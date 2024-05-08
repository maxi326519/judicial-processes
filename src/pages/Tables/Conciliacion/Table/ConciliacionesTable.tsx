import { getLists as getConciliacionesLists } from "../../../../redux/actions/Processes/lists";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { useEffect } from "react";
import { getLists } from "../../../../redux/actions/Conciliaciones/lists";
import { getUsers } from "../../../../redux/actions/users";
import { useState } from "react";
import { UserRol } from "../../../../interfaces/users";
import {
  deleteConciliacion,
  getConciliacionesHeaders,
  deleteConciliacionDetail,
  clearAllConciliaciones,
  getUserDisabled,
  getConciliacion,
} from "../../../../redux/actions/Conciliaciones/conciliaciones";
import {
  ConciliacionesFilters,
  ConciliacionesHeads,
  initConciliacionesFilters,
} from "../../../../interfaces/Conciliaciones/data";
import swal from "sweetalert";

import Form from "./Form/Form";
import Filters from "./FIlters/Filters";
import Lists from "../Lists/Lists";
import ConciliacionRow from "./ConciliacionesRow/ConciliacionesRow";

import styles from "./ConciliacionesTable.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import listSvg from "../../../../assets/svg/list.svg";
import getSignal from "../../../../functions/getSignal";

export default function ConciliacionTable() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const users = useSelector((state: RootState) => state.users);
  const conciliacion = useSelector(
    (state: RootState) => state.conciliaciones.heads
  );
  const [filters, setFilters] = useState<ConciliacionesFilters>(
    initConciliacionesFilters()
  );
  const [rows, setRows] = useState<ConciliacionesHeads[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    if (conciliacion.length === 0) handleGetConciliaciones();
    if (users.length === 0) handleGetUsers();
  }, []);

  useEffect(() => {
    const filter = conciliacion.filter((data: ConciliacionesHeads) => {
      // Add filters

      /* id */
      if (filters.id && filters.id === data.id) return false;

      /* FECHA SOLICITUD */
      if (
        filters.fechaIngresoSolicitud &&
        !(
          filters.fechaIngresoSolicitud.getDate() ===
            data.fechaIngresoSolicitud?.getDate() &&
          filters.fechaIngresoSolicitud.getMonth() ===
            data.fechaIngresoSolicitud?.getMonth() &&
          filters.fechaIngresoSolicitud.getFullYear() ===
            data.fechaIngresoSolicitud?.getFullYear()
        )
      )
        return false;

      console.log(filters.fechaIngresoSolicitud);
      console.log(data.fechaIngresoSolicitud);

      /* RADICADO SIPA */
      if (
        filters.radicadoSIPA &&
        !data.radicadoSIPA.toString().startsWith(filters.radicadoSIPA)
      )
        return false;

      /* CONVOCANTE */
      if (
        filters.convocante &&
        !data.convocante
          .toUpperCase()
          .includes(filters.convocante.toUpperCase())
      )
        return false;

      /* ASIGNACION ABOGADO */
      if (
        filters.asignacionAbogado &&
        !data.asignacionAbogado
          .toUpperCase()
          .includes(filters.asignacionAbogado.toUpperCase())
      )
        return false;

      /* ESTADO SOLICITUD */
      if (
        filters.estadoSolicitud &&
        !data.estadoSolicitud
          .toUpperCase()
          .includes(filters.estadoSolicitud.toUpperCase())
      )
        return false;

      /* MEDIO DE CONTROL */
      if (
        filters.medioControl &&
        !data.medioControl
          .toUpperCase()
          .includes(filters.medioControl.toUpperCase())
      )
        return false;

      /* DESICION DEL COMITE */
      if (
        filters.decisionComite &&
        !data.decisionComite
          .toUpperCase()
          .includes(filters.decisionComite.toUpperCase())
      )
        return false;

      /* ESTADO */
      if (
        filters.estado !== 0 &&
        filters.estado !== getSignal(data.terminoLegal)
      )
        return false;

      return true;
    });

    setRows(filter);
  }, [conciliacion, filters]);

  function handleGetConciliaciones() {
    setLoading(true);
    setError(false);

    Promise.all([
      dispatch<any>(getConciliacionesHeaders(user)),
      dispatch<any>(getConciliacionesLists()),
      dispatch<any>(getLists()),
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

  function handleDelete(conciliacion: ConciliacionesHeads) {
    swal({
      text: "¿Seguro que desea eliminar esta conciliacion?",
      icon: "warning",
      buttons: {
        Aceptar: true,
        Cancelar: true,
      },
    }).then((response: any) => {
      console.log(response);
      if (response === "Aceptar") {
        dispatch(openLoading());
        dispatch<any>(deleteConciliacion(conciliacion.id!))
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Eliminado",
              "Se eliminó correctamente la conciliacion",
              "success"
            );
          })
          .catch((err: any) => {
            dispatch(closeLoading());
            console.log(err);
            swal(
              "Error",
              "No se pudo eliminar este conciliacion, intentelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleClearConciliaciones() {
    swal({
      text: "¿Seguro que desea eliminar toda la base de datos de conciliaciones?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      if (response === "Si") {
        dispatch(openLoading());
        dispatch<any>(clearAllConciliaciones())
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Eliminados",
              "Se eliminaron todas las conciliaciones existentes",
              "success"
            );
          })
          .catch((error: any) => {
            console.log(error);
            dispatch(closeLoading());
            swal(
              "Error",
              "No se pudieron eliminar las conciliaciones, inténtelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleEdit(id: number) {
    dispatch(openLoading());
    dispatch<any>(getConciliacion(id))
      .then(() => {
        dispatch(closeLoading());
        setForm(true);
      })
      .catch((error: any) => {
        dispatch(closeLoading());
        console.log(error);
        swal(
          "Error",
          "Hubo un error al cargar la conciliacion, intentelo mas tarde",
          "error"
        );
      });
  }

  function handleClose() {
    setForm(!form);
    if (form) {
      dispatch(deleteConciliacionDetail());
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
              onClick={handleClearConciliaciones}
            >
              X <span>Eliminar todas las conciliaciones</span>
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
              + Nuevo conciliacion
            </button>
          </div>
        )}
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.row} ${styles.firstRow}`}>
            <td>id</td>
            <td>Fecha Solicitud</td>
            <td>Radicado SIPA</td>
            <td>Convocante</td>
            <td>Asignacion abogado</td>
            <td>Estado de la solicitud</td>
            <td>Medio de Control</td>
            <td>Decisión de Comité</td>
            <td>Término legal</td>
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
                <span>No se pudo cargar las conciliaciones</span>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleGetConciliaciones}
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
                <th>No hay conciliaciones</th>
              </tr>
            ) : (
              rows
                ?.sort((a, b) => {
                  if (a === null) return 1;
                  if (b.fechaIngresoSolicitud === null) return 1;
                  if (a.fechaIngresoSolicitud === null) return 1;
                  if (
                    a.fechaIngresoSolicitud.getTime() >
                    b.fechaIngresoSolicitud.getTime()
                  )
                    return -1;
                  if (
                    a.fechaIngresoSolicitud.getTime() <
                    b.fechaIngresoSolicitud.getTime()
                  )
                    return 1;
                  return 0;
                })
                .map((conciliacion: ConciliacionesHeads) => (
                  <ConciliacionRow
                    key={conciliacion.id}
                    conciliacion={conciliacion}
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
