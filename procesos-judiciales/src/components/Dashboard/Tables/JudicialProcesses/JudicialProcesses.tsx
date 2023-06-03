import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import {
  deleteProcesses,
  getProcesses,
} from "../../../../redux/actions/judicialProcesses";
import {
  JudicialProcesses,
  ProcessesFilters,
  initProcessesFilters,
} from "../../../../interfaces/JudicialProcesses";

import JudicialProcessesRow from "./JudicialProcessesRow/JudicialProcessesRow";
import Form from "./Form/Form";
import Filters from "./FIlters/Filters";

import styles from "./JudicialProcesses.module.css";
import list from "../../../../assets/svg/list.svg";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import swal from "sweetalert";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
export default function JudicialProcessesTable() {
  const dispatch = useDispatch();
  const judicialProcesses = useSelector(
    (state: RootState) => state.processes.judicialProcesses
  );
  const [filters, setFilters] =
    useState<ProcessesFilters>(initProcessesFilters);
  const [rows, setRows] = useState<JudicialProcesses[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (judicialProcesses.length === 0) handleGetProcesses();
  }, []);

  useEffect(() => {
    const filter = judicialProcesses.filter((data: JudicialProcesses) => {
      if (
        !filters.apoderadoActual &&
        !filters.idSiproj &&
        !filters.radRamaJudicialInicial &&
        !filters.radRamaJudicialActual &&
        !filters.demandante
      )
        return true;
      if (data.idSiproj !== filters.idSiproj) return false;
      if (data.radRamaJudicialInicial !== filters.radRamaJudicialInicial)
        return false;
      if (data.radRamaJudicialActual !== filters.radRamaJudicialActual)
        return false;
      if (data.demandante !== filters.demandante) return false;
      return true;
    });
    setRows(filter);
  }, [judicialProcesses, filters]);

  function handleGetProcesses() {
    setLoading(true);
    setError(false);
    dispatch<any>(getProcesses())
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  function handleDelete(processes: JudicialProcesses) {
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

  function handleFilter(filters: ProcessesFilters) {
    setFilters(filters);
  }

  function handleEdit(id: number) {}

  function handleClose() {
    setForm(!form);
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? <Form handleClose={handleClose} /> : null}
      <h3>Procesos Judiciales</h3>
      <div className={styles.controls}>
        <Filters filters={filters} handleSetFilter={handleFilter} />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={handleClose}
        >
          <img src={list} alt="list" />
          <span>Listas</span>
        </button>
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
            <th>ID Ekogui</th>
            <th>Nº Proceso Judicial (INICIAL)</th>
            <th>Nº Proceso Judicial (ACTUAL)</th>
            <th>Demandante Nombre</th>
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
              rows?.map((judicialProcesses: JudicialProcesses) => (
                <JudicialProcessesRow
                  key={judicialProcesses.idSiproj}
                  judicialProcesses={judicialProcesses}
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
