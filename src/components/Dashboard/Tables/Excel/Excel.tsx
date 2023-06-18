import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { UserRol } from "../../../../interfaces/users";
import {
  Query,
  QuerySnapshot,
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import {
  getProcesses,
  importProcesses,
} from "../../../../redux/actions/judicialProcesses";
import {
  JudicialProcesses,
  ProcessesDetails,
  ProcessesState,
} from "../../../../interfaces/JudicialProcesses";
import swal from "sweetalert";

import ExcelRow from "./ExcelRow/ExcelRow";
import ImportExcel from "./ImportExcel/ImportExcel";
import ExportExcel from "./ExportExcel/ExportExcel";

import styles from "./Excel.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import importSvg from "../../../../assets/svg/import.svg";
import exportSvg from "../../../../assets/svg/export.svg";

enum actionType {
  import,
  export,
}

interface Data {
  head: [];
  details: ProcessesDetails[];
}

const initData: Data = { head: [], details: [] };

export default function Excel() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const judicialProcesses = useSelector(
    (state: RootState) => state.processes.judicialProcesses
  );
  const [rows, setRows] = useState<JudicialProcesses[]>([]);
  const [excelData, setExcelData] = useState([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [state, setState] = useState<ProcessesState | string>("");
  const [data, setData] = useState<Data>(initData);
  const [action, setAction] = useState<actionType>(actionType.export);
  const [formExport, setFormExport] = useState(false);

  useEffect(() => {
    if (judicialProcesses.length === 0) handleGetProcesses();
  }, []);

  useEffect(() => {
    setRows(
      judicialProcesses.filter((processes) => {
        if (state !== "" && processes.estado !== state) return false;
        return true;
      })
    );
  }, [judicialProcesses, state]);

  function handleGetProcesses() {
    setLoading(true);
    setError(false);
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

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === "") {
      setState("");
    } else if (event.target.value === ProcessesState.Activo) {
      setState(ProcessesState.Activo);
    } else if (event.target.value === ProcessesState.Terminado) {
      setState(ProcessesState.Terminado);
    }
  }

  function handleData(data: Data) {
    setData(data);
    setRows(data.head);
    setAction(actionType.import);
  }

  function handleConfirmImport() {
    dispatch(openLoading());
    dispatch<any>(importProcesses(data))
      .then(() => {
        dispatch(closeLoading());
        setAction(actionType.export);
        setData(initData);
        setRows(judicialProcesses);

        swal("Guardado", "Se guardaron todos los datos con exito", "success");
      })
      .catch((error: any) => {
        console.log(error);
        dispatch(closeLoading());
        if (error.message.includes("Hubo un error")) {
          swal("Error", error.message, "error");
        } else {
          swal("Error", "No se pudieron guardar todos los datos", "error");
        }
      });
  }

  function handleCancelImport() {
    swal({
      text: "¿Seguro que desea cancelar la importación de los procesos?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      if (response === "Si") {
        setData(initData);
        setRows([]);
        setAction(actionType.export);
      }
    });
  }

  async function handleGetData() {
    dispatch(openLoading());
    try {
      const colProcesses = collection(db, "Details");
      const details: any = [];
      let snapshot: QuerySnapshot;
      let wheres = {
        apoderado: where("apoderadoActual", "==", user.name),
        estado: where("estado", "==", state),
      };

      if (user.rol === UserRol.Admin) {
        let detailsQuery: Query;
        if (state === "") {
          snapshot = await getDocs(colProcesses);
        } else {
          detailsQuery = query(colProcesses, wheres.estado);
          snapshot = await getDocs(detailsQuery);
        }
      } else {
        let detailsQuery: Query;
        if (state === "") {
          detailsQuery = query(colProcesses, wheres.apoderado);
          snapshot = await getDocs(detailsQuery);
        } else {
          detailsQuery = query(colProcesses, wheres.apoderado, wheres.estado);
          snapshot = await getDocs(detailsQuery);
        }
      }

      snapshot.forEach((doc) => {
        details.push(convertirValoresATexto(doc.data()));
      });

      setExcelData(details);

      handleCloseExport();
      dispatch(closeLoading());
    } catch (err: any) {
      console.log(err);
      dispatch(closeLoading());
      swal("Error", "No se pudieron obtener los datos para exportar");
    }
  }

  function handleClose() {
    setForm(!form);
  }

  function handleCloseExport() {
    setFormExport(!formExport);
  }

  function convertirValoresATexto(objeto: any) {
    const resultado: any = {};

    for (const clave in objeto) {
      if (objeto.hasOwnProperty(clave)) {
        const valor = objeto[clave];
        if (typeof valor === "number" || valor === null) {
          resultado[clave] = String(valor);
        } else if (valor instanceof Timestamp) {
          resultado[clave] = valor.toDate().toISOString().split("T")[0];
        } else {
          resultado[clave] = valor;
        }
      }
    }

    return resultado;
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? (
        <ImportExcel handleData={handleData} handleClose={handleClose} />
      ) : null}
      {formExport ? (
        <ExportExcel
          data={excelData}
          state={state}
          handleClose={handleCloseExport}
        />
      ) : null}
      <div className={styles.controls}>
        {action === actionType.export ? (
          <div className={styles.filter}>
            <label htmlFor="state">Tipo: </label>
            <select
              id="state"
              className="form-select"
              value={state}
              onChange={handleSelect}
            >
              <option value="">Todos</option>
              <option value={ProcessesState.Activo}>Activos</option>
              <option value={ProcessesState.Terminado}>Terminados</option>
            </select>
            <span className={styles.counter}>
              {rows.length} procesos seleccionados
            </span>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleConfirmImport}
            >
              Confirmar
            </button>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={handleCancelImport}
            >
              Cancelar
            </button>

            <span>Se importarán {rows.length}</span>
          </div>
        )}
        <div>
          {user.rol === UserRol.Admin ? (
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleClose}
            >
              <img src={importSvg} alt="import" />
              <span>Importar</span>
            </button>
          ) : null}
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleGetData}
          >
            <img src={exportSvg} alt="exportar" />
            <span>Exportar</span>
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.row} ${styles.firstRow}`}>
            <th>ID idSiproj</th>
            <th>Rad. Proceso Judicial (INICIAL)</th>
            <th>Rad. Proceso Judicial (ACTUAL)</th>
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
