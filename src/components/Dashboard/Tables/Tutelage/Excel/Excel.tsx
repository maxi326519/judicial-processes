import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
import { UserRol } from "../../../../../interfaces/users";
import { db } from "../../../../../firebase/config";
import {
  Query,
  QuerySnapshot,
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getTutelas,
  importTutelas,
} from "../../../../../redux/actions/Tutelas/tutelas";
import {
  TutelaHeads,
  TutelaDetails,
} from "../../../../../interfaces/Tutelas/data";
import swal from "sweetalert";

import ExcelRow from "./ExcelRow/ExcelRow";
import ImportExcel from "./ImportExcel/ImportExcel";
import ExportExcel from "./ExportExcel/ExportExcel";

import styles from "./Excel.module.css";
import loadingSvg from "../../../../../assets/img/loading.gif";
import errorSvg from "../../../../../assets/svg/error.svg";
import importSvg from "../../../../../assets/svg/import.svg";
import exportSvg from "../../../../../assets/svg/export.svg";

enum actionType {
  import,
  export,
}

interface Data {
  head: TutelaHeads[];
  details: TutelaDetails[];
}

const initData: Data = { head: [], details: [] };

export default function Excel() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const tutelas = useSelector((state: RootState) => state.tutelas.heads);
  const [rows, setRows] = useState<TutelaHeads[]>([]);
  const [excelData, setExcelData] = useState([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Data>(initData);
  const [action, setAction] = useState<actionType>(actionType.export);
  const [formExport, setFormExport] = useState(false);

  useEffect(() => {
    if (tutelas.length === 0) handleGetTutelas();
  }, []);

  function handleGetTutelas() {
    setLoading(true);
    setError(false);
    dispatch<any>(getTutelas(user))
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  function handleData(data: Data) {
    setData(data);
    setRows(data.head);
    setAction(actionType.import);
  }

  function handleConfirmImport() {
    dispatch(openLoading());
    dispatch<any>(importTutelas(data.details))
      .then(() => {
        dispatch(closeLoading());
        setAction(actionType.export);
        setData(initData);
        setRows(tutelas);

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
      const colTutelas = collection(db, "Details");
      const details: any = [];
      /*       let snapshot: QuerySnapshot;
      let wheres = {
        apoderado: where("apoderadoActual", "==", user.name),
        estado: where("estado", "==", state),
      };

      if (user.rol === UserRol.Admin) {
        let detailsQuery: Query;
        if (state === "") {
          snapshot = await getDocs(colTutelas);
        } else {
          detailsQuery = query(colTutelas, wheres.estado);
          snapshot = await getDocs(detailsQuery);
        }
      } else {
        let detailsQuery: Query;
        if (state === "") {
          detailsQuery = query(colTutelas, wheres.apoderado);
          snapshot = await getDocs(detailsQuery);
        } else {
          detailsQuery = query(colTutelas, wheres.apoderado, wheres.estado);
          snapshot = await getDocs(detailsQuery);
        }
      }

      snapshot.forEach((doc) => {
        details.push(convertirValoresATexto(doc.data()));
      }); */

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

    console.log("--------------------------------");
    for (const clave in objeto) {
      if (objeto.hasOwnProperty(clave)) {
        const valor = objeto[clave];

        if (typeof valor === "number") {
          resultado[clave] = String(valor);
        } else if (valor === null || valor === undefined) {
          resultado[clave] = "";
        } else if (valor instanceof Timestamp) {
          const dateUTC = valor.toDate().toISOString().split("T")[0].split("-");
          const year = dateUTC[0];
          const month = dateUTC[1];
          const day = dateUTC[2];

          resultado[clave] = `${day}/${month}/${year}`;
        } else {
          resultado[clave] = valor;
        }
      }
      console.log(clave, objeto[clave], "=>", resultado[clave]);
    }

    return resultado;
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? (
        <ImportExcel handleData={handleData} handleClose={handleClose} />
      ) : null}
      {formExport ? (
        <ExportExcel data={excelData} handleClose={handleCloseExport} />
      ) : null}
      <div className={styles.controls}>
        {action === actionType.export ? (
          <div className={styles.filter}>
            {/*             <label htmlFor="state">Tipo: </label>
            <select
              id="state"
              className="form-select"
              value={state}
              onChange={handleSelect}
            >
              <option value="">Todos</option>
              <option value={TutelasState.Activo}>Activos</option>
              <option value={TutelasState.Terminado}>Terminados</option>
            </select>
            <span className={styles.counter}>
              {rows.length} procesos seleccionados
            </span> */}
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
            <th>Nro de Tutela</th>
            <th>Abogado</th>
            <th>ID del demandante</th>
            <th>Demandante</th>
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
                <th>No hay procesos</th>
              </tr>
            ) : (
              rows?.map((tutela: TutelaHeads) => (
                <ExcelRow key={tutela.idSiproj} tutela={tutela} />
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
