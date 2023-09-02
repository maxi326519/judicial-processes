import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { getLists } from "../../../../redux/actions/Processes/lists";
import { UserRol } from "../../../../interfaces/users";
import { getUsers } from "../../../../redux/actions/users";
import {
  deleteProcesses,
  deleteProcessDetails,
  getProcesses,
  getProcessDetails,
  clearAllProcesses,
} from "../../../../redux/actions/Processes/processes";
import {
  ProcessHeads,
  ProcessFilters,
  initProcessFilters,
} from "../../../../interfaces/Processes/data";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import swal from "sweetalert";

import ProcessesRow from "./ProcessesRow/ProcessesRow";
import Form from "./Form/Form";
import Filters from "./FIlters/Filters";
import Lists from "../Lists/Lists";

import styles from "./ProcessesTable.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import listSvg from "../../../../assets/svg/list.svg";
import ProcessesDetails from "../ProcessesDetails/ProcessesDetails";

export default function ProcessesTable() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const users = useSelector((state: RootState) => state.users);
  const processesHeads = useSelector(
    (state: RootState) => state.processes.heads
  );
  const [filters, setFilters] = useState<ProcessFilters>({
    ...initProcessFilters,
  });
  const [rows, setRows] = useState<ProcessHeads[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(false);

  const [radicado, setRadicado] = useState<string>("");

  useEffect(() => {
    if (processesHeads.length === 0) handleGetProcesses();
    if (users.length === 0) handleGetUsers();
  }, []);

  useEffect(() => {
    const filter = processesHeads.filter((data: ProcessHeads) => {
      if (
        filters.apoderadoActual ||
        filters.idSiproj ||
        filters.radRamaJudicialInicial ||
        filters.radRamaJudicialActual ||
        filters.demandante ||
        filters.posicionSDP ||
        filters.tipoProceso
      ) {
        console.log(data.posicionSDP, filters.posicionSDP.toUpperCase());
        console.log(data.tipoProceso, filters.tipoProceso.toUpperCase());
        if (
          filters.apoderadoActual &&
          filters.apoderadoActual !== data.apoderadoActual
        )
          return false;
        if (
          filters.idSiproj &&
          !data.idSiproj.toString().startsWith(filters.idSiproj.toString())
        )
          return false;
        if (
          filters.tipoProceso &&
          !data.tipoProceso.includes(filters.tipoProceso.toUpperCase())
        )
          return false;
        if (
          filters.radRamaJudicialInicial &&
          !data.radRamaJudicialInicial
            .toString()
            .startsWith(filters.radRamaJudicialInicial.toString())
        ) {
          return false;
        }

        if (
          filters.radRamaJudicialActual &&
          !data.radRamaJudicialActual
            .toString()
            .startsWith(filters.radRamaJudicialActual.toString())
        )
          return false;

        if (
          filters.demandante &&
          !data.demandante.includes(filters.demandante.toUpperCase())
        )
          return false;
        if (
          filters.posicionSDP &&
          !data.posicionSDP.includes(filters.posicionSDP.toUpperCase())
        )
          return false;
        return true;
      } else return true;
    });
    setRows(filter);
  }, [processesHeads, filters]);

  function handleGetProcesses() {
    setLoading(true);
    setError(false);
    dispatch<any>(getLists());
    dispatch<any>(getProcesses(user))
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

  function handleDelete(processes: ProcessHeads) {
    swal({
      text: "¿Seguro que desea eliminar este proceso?",
      icon: "warning",
      buttons: {
        Aceptar: true,
        Cancelar: true,
      },
    }).then((response: any) => {
      console.log(response);
      if (response === "Aceptar") {
        dispatch(openLoading());
        dispatch<any>(deleteProcesses(processes))
          .then(() => {
            dispatch(closeLoading());
            swal("Eliminado", "Se eliminó correctamente el proceso", "success");
          })
          .catch((err: any) => {
            dispatch(closeLoading());
            console.log(err);
            swal(
              "Error",
              "No se pudo eliminar este proceso, intentelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleClearProcesses() {
    swal({
      text: "¿Seguro que desea eliminar toda la base de datos de procesos?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      if (response === "Si") {
        dispatch(openLoading());
        dispatch<any>(clearAllProcesses())
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
    dispatch<any>(getProcessDetails(idSiproj))
      .then(() => {
        dispatch(closeLoading());
        setForm(true);
      })
      .catch((error: any) => {
        dispatch(closeLoading());
        console.log(error);
        swal(
          "Error",
          "Hubo un error al cargar el proceso, intentelo mas tarde",
          "error"
        );
      });
  }

  function handleClose() {
    setForm(!form);
    if (form) {
      dispatch(deleteProcessDetails());
    }
  }

  function handleShowList() {
    setList(!list);
  }

  function handleActuaciones(radicado?: string) {
    if (radicado) {
      setRadicado(radicado);
    } else {
      setRadicado("");
    }
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? <Form handleClose={handleClose} /> : null}
      {list ? <Lists handleClose={handleShowList} /> : null}
      {radicado ? <ProcessesDetails radicado={radicado} handleClose={handleActuaciones} /> : null}
      <div className={styles.controls}>
        <Filters filters={filters} setFilters={setFilters} />
        {user.rol === UserRol.Admin ? (
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
              onClick={handleClearProcesses}
            >
              X <span>Eliminar todos los procesos</span>
            </button>
          </div>
        ) : null}
        <div>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleClose}
          >
            + Nuevo Proceso
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.row} ${styles.firstRow}`}>
            <th>ID Siproj</th>
            <th>Tipo de proceso</th>
            <th>Rad. Proceso Judicial (INICIAL)</th>
            <th>Rad. Proceso Judicial (ACTUAL)</th>
            <th>Demandante Nombre</th>
            <th>Apoderado Actual</th>
            <th>Posición SPD</th>
            <th>Consulta Rama</th>
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
                <span>No se pudo cargar los procesos</span>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleGetProcesses}
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
                <th>No hay procesos</th>
              </tr>
            ) : (
              rows?.map((processesHeads: ProcessHeads) => (
                <ProcessesRow
                  key={processesHeads.idSiproj}
                  processes={processesHeads}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleActuaciones={handleActuaciones}
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
