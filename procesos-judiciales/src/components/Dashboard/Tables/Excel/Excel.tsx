import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { getProcesses } from "../../../../redux/actions/judicialProcesses";
import {
  JudicialProcesses,
  ProcessesDetails,
} from "../../../../interfaces/JudicialProcesses";

import ExcelRow from "./ExcelRow/ExcelRow";

import styles from "./Excel.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import importSvg from "../../../../assets/svg/import.svg";
import exportSvg from "../../../../assets/svg/export.svg";
import ImportExcel from "./ImportExcel/ImportExcel";

interface Data {
  head: [];
  details: ProcessesDetails[];
}

export default function Excel() {
  const dispatch = useDispatch();
  const judicialProcesses = useSelector(
    (state: RootState) => state.processes.judicialProcesses
  );
  const [rows, setRows] = useState<JudicialProcesses[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState<number>(0);
  const [data, setData] = useState<Data>({ head: [], details: [] });

  useEffect(() => {
    if (judicialProcesses.length === 0) handleGetProcesses();
  }, []);

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

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(Number(event.target.value));
  }

  function handleData(data: Data) {
    setData(data);
    setRows(data.head);
    console.log(data.head);
  }

  function handleClose() {
    setForm(!form);
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? (
        <ImportExcel handleData={handleData} handleClose={handleClose} />
      ) : null}
      <h3>Tablas en Excel</h3>
      <div className={styles.controls}>
        <div className={styles.filter}>
          <label htmlFor="type">Tipo: </label>
          <select
            id="type"
            className="form-select"
            value={type}
            onChange={handleSelect}
          >
            <option value="0">Todos</option>
            <option value="1">Activos</option>
            <option value="2">Terminados</option>
          </select>
        </div>
        <div>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleClose}
          >
            <img src={importSvg} alt="import" />
            <span>Importar</span>
          </button>
          <button className="btn btn-outline-primary" type="button">
            <img src={exportSvg} alt="export" />
            <span>Exportar</span>
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
                <ExcelRow
                  key={judicialProcesses.idSiproj}
                  judicialProcesses={judicialProcesses}
                />
              ))
            )}
          </div>
        </tbody>
      </table>
    </div>
  );
}
