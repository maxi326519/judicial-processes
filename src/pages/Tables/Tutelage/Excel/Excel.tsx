import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { UserRol } from "../../../../interfaces/users";
import { db } from "../../../../firebase/config";
import {
  Query,
  QuerySnapshot,
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getTutelas,
  importTutelas,
} from "../../../../redux/actions/Tutelas/tutelas";
import {
  TutelaHeads,
  TutelaDetails,
} from "../../../../interfaces/Tutelas/data";
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

  useEffect(() => {
    setRows(tutelas);
  }, [tutelas]);

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
      // Firestore collections
      const tutelasDoc = doc(collection(db, "Data"), "Tutelas");
      const tutelasColl = collection(tutelasDoc, "Details");
      let details: any = [];

      // Query variables
      let snapshot: QuerySnapshot;
      let wheres = {
        apoderado: where("apoderadoActual", "==", user.name),
      };

      // IF the user is admin, get all data, else just their data
      if (user.rol === UserRol.Admin) {
        // Get all data
        snapshot = await getDocs(tutelasColl);
      } else {
        // Get just user data
        let detailsQuery: Query;
        detailsQuery = query(tutelasColl, wheres.apoderado);
        snapshot = await getDocs(detailsQuery);
      }

      // Save data
      snapshot.forEach((doc) =>
        details.push(doc.data())
      );

      // Sort, convert and save the data to export
      setExcelData(details
        .sort((a: any, b: any) => {
          if (a.fecha === null) return 1;
          if (b.fecha === null) return -1;
          if (a.fecha > b.fecha) return 1;
          if (a.fecha < b.fecha) return -1;
          return 0;
        })
        .map((data: TutelaDetails) => convertirValoresATexto(data))
      );

      // CLose
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
        // Get property data
        const valor = objeto[clave];

        if (typeof valor === "number") {
          // If is number conver to string
          resultado[clave] = String(valor);
        } else if (valor === null || valor === undefined) {
          // If is null or undefined, save empty string
          resultado[clave] = "";
        } else if (typeof valor === "boolean") {
          resultado[clave] = valor ? " SI" : "NO";
        } else if (valor instanceof Timestamp) {
          // If is Date, convert to string and add time if necessary
          const date = valor.toDate();

          // Get date data
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();

          // Get time data
          const hour = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();

          // Set date
          resultado[clave] = `${`0${day}`.slice(-2)}/${`0${month}`.slice(
            -2
          )}/${year}`;

          // Set time
          resultado[`${clave}Hora`] = `${`0${hour}`.slice(
            -2
          )}:${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;
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
        <ExportExcel data={excelData} handleClose={handleCloseExport} />
      ) : null}
      <div className={styles.controls}>
        {action === actionType.export && (
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
            <th>Tema de la tutela</th>
            <th>ID del demandante</th>
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
