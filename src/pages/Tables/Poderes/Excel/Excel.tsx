import { PoderesDetails, PoderesHeads } from "../../../../interfaces/Poderes/data";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { useEffect } from "react";
import { useState } from "react";
import { UserRol } from "../../../../interfaces/users";
import { db } from "../../../../firebase/config";
import {
  QuerySnapshot,
  Timestamp,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  getPoderes,
  importPoderes,
} from "../../../../redux/actions/Poderes/poderes";
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
  head: PoderesHeads[];
  details: PoderesDetails[];
}

const initData: Data = { head: [], details: [] };

export default function Excel() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const poderes = useSelector((state: RootState) => state.poderes.heads);
  const [rows, setRows] = useState<PoderesHeads[]>([]);
  const [excelData, setExcelData] = useState([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Data>(initData);
  const [action, setAction] = useState<actionType>(actionType.export);
  const [formExport, setFormExport] = useState(false);

  useEffect(() => {
    if (poderes.length === 0) handleGetPoderes();
  }, []);

  useEffect(() => {
    setRows(poderes);
  }, [poderes]);

  function handleGetPoderes() {
    setLoading(true);
    setError(false);
    dispatch<any>(getPoderes(user))
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
    dispatch<any>(importPoderes(data.details))
      .then(() => {
        dispatch(closeLoading());
        setAction(actionType.import);
        setData(initData);
        setRows(poderes);

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
      text: "¿Seguro que desea cancelar la importación de los poderes?",
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
      const poderesDoc = doc(collection(db, "Data"), "Poderes");
      const poderesColl = collection(poderesDoc, "Details");
      let details: any = [];

      // Query variables
      let snapshot: QuerySnapshot;
      snapshot = await getDocs(poderesColl);

      // Save data
      snapshot.forEach((doc) =>
        details.push(doc.data())
      );

      // Sort, convert and save the data to export
      setExcelData(details
        .sort((a: any, b: any) => {
          if (a.fechaRadicacion === null) return 1;
          if (b.fechaRadicacion === null) return -1;
          if (a.fechaRadicacion > b.fechaRadicacion) return 1;
          if (a.fechaRadicacion < b.fechaRadicacion) return -1;
          return 0;
        })
        .map((data: PoderesDetails) => convertirValoresATexto(data))
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
          const dateUTC = valor.toDate().toISOString().split("T")[0].split("-");
          const year = dateUTC[0];
          const month = dateUTC[1];
          const day = dateUTC[2];

          resultado[clave] = `${day}/${month}/${year}`;
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
        {action === actionType.import && (
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
            <th>Radicado</th>
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
                <span>No se pudo cargar los poderes</span>
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
                <ExcelRow key={poder.id} poder={poder} />
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
