import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { getProcesses } from "../../../../redux/actions/judicialProcesses";
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
    if (judicialProcesses.length === 0) {
      handleGetProcesses();
    }
  }, []);

  useEffect(() => {
    const filter = judicialProcesses.filter((data: JudicialProcesses) => {
      if (
        !filters.firma &&
        !filters.idEkogui &&
        !filters.numProcesoRamaInicial &&
        !filters.numProcesoRamaActual &&
        !filters.nombreDemandante
      )
        return true;
      if (data.idEkogui !== filters.idEkogui) return false;
      if (data.numProcesoRamaInicial !== filters.numProcesoRamaInicial)
        return false;
      if (data.numProcesoRamaActual !== filters.numProcesoRamaActual)
        return false;
      if (data.nombreDemandante !== filters.nombreDemandante) return false;
      return true;
    });
    setRows(filter);

    console.log(filter);
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
                  key={judicialProcesses.idEkogui}
                  judicialProcesses={judicialProcesses}
                  handleEdit={handleEdit}
                />
              ))
            )}
          </div>
        </tbody>
      </table>
    </div>
  );
}
