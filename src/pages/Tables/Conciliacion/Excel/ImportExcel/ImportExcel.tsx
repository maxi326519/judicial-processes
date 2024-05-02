import { useDispatch } from "react-redux";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
import {
  Conciliaciones,
  ConciliacionesHeads,
} from "../../../../../interfaces/Conciliaciones/data";
import * as XLSX from "xlsx";
import swal from "sweetalert";
import moment from "moment";

import styles from "./ImportExcel.module.css";

interface Props {
  handleData: (data: any) => void;
  handleClose: () => void;
}

export default function ImportExcel({ handleData, handleClose }: Props) {
  const dispatch = useDispatch();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(openLoading());
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(openLoading());
        try {
          let data: any = [];
          const workbook = XLSX.read(e.target?.result, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const worksheetData: any = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            raw: false,
          });

          worksheetData
            .slice(1)
            .forEach((item: any) => (item[3] ? data.push(item) : null));

          const convert = dataConvert(data);
          handleData(convert);
          handleClose();

          dispatch(closeLoading());
        } catch (err: any) {
          console.log(err);
          dispatch(closeLoading());

          if (
            err.message.includes("El id") ||
            err.message.includes("El radicado")
          ) {
            swal("Error", err.message, "error");
          } else {
            swal("Error", "No se pudo cargar el archivo", "error");
          }
        }
      };
      reader.readAsBinaryString(event.target.files[0]);
    }
  };

  function dataConvert(data: any) {
    let newData: Conciliaciones[] = [];
    let idList: number[] = [];
    let nroList: string[] = [];
    let radicadoList: string[] = [];

    data.forEach((conciliacion: any, i: number) => {
      // Save data to check
      const idSiproj = Number(conciliacion[21]);
      const nroConciliacion = conciliacion[11];
      const radicado = conciliacion[3];

      // Check if idSiproj already exist
      /*       if (idList.some((id) => id === idSiproj))
        throw new Error(`El id de la fila ${i + 1} ya existe: (${idSiproj})`); */

      // Check if radicado already exist
      if (radicadoList.some((radicadoItem) => radicadoItem === radicado))
        throw new Error(
          `El radicado de la fila ${i + 1} ya existe: (${radicado})`
        );

      // Check if nroConciliacion already exist
      /*       if (nroList.some((nro) => nro === nroConciliacion))
        throw new Error(`El numero ${i + 1} ya existe: (${radicado})`); */

      // Add idSiproj and nroConciliacion to list
      idList.push(idSiproj);
      nroList.push(nroConciliacion);

      if (radicado !== "NO TIENE NUMERO SIPA") {
        radicadoList.push(radicado);
      }

      const currentData: Conciliaciones = {
        id: Number(conciliacion[0] || 0),
        fechaIngresoSolicitud: newDate(conciliacion[1] || ""),
        radicadoSIPA: textParser(conciliacion[2] || ""),
        convocante: textParser(conciliacion[3] || ""),
        medioControl: textParser(conciliacion[4] || ""),
        pretension: textParser(conciliacion[5] || ""),
        valorEstimado: textParser(conciliacion[6] || ""),
        asignacionAbogado: textParser(conciliacion[7] || ""),
        estadoSolicitud: textParser(conciliacion[8] || ""),
        terminoLegal: newDate(conciliacion[9]),
        consecutivo: Number(conciliacion[10] || ""),
        radicadosSIPASolicitud: textParser(conciliacion[11] || ""),
        radicadosSIPARespuesta: textParser(conciliacion[12] || ""),
        fechaComite: newDate(conciliacion[13] || ""),
        desicionComite: textParser(conciliacion[14] || ""),
        estadoAudiencia: textParser(conciliacion[15] || ""),
        procuraduriaRemitente: textParser(conciliacion[16] || ""),
        numeroSolicitud: textParser(conciliacion[17] || ""),
        fechaCitacionAudiencia: newDate(conciliacion[18] || ""),
        observaciones: textParser(conciliacion[19] || ""),
      };
      newData.push(currentData);
    });

    return {
      head: newData.map(
        (item: Conciliaciones): ConciliacionesHeads => ({
          id: item.id,
          fechaIngresoSolicitud: item.fechaIngresoSolicitud,
          radicadoSIPA: item.radicadoSIPA,
          convocante: item.convocante,
          asignacionAbogado: item.asignacionAbogado,
          estadoSolicitud: item.estadoSolicitud,
          medioControl: item.medioControl,
          desicionComite: item.desicionComite,
        })
      ),
      details: newData,
    };
  }

  function newDate(fechaExcel: string) {
    // Supongamos que 'fechaExcel' es la fecha leída del archivo Excel en formato '9/2/21'
    let fechaFormateada = "";

    // Verificar si el formato de fecha es mes/día/año o día/mes/año
    if (/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(fechaExcel)) {
      fechaFormateada = moment(fechaExcel, "M/D/YY").format("MM/DD/YYYY");
    } else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fechaExcel)) {
      fechaFormateada = moment(fechaExcel, "D/M/YYYY").format("MM/DD/YYYY");
    }

    // Crear el objeto moment
    const fechaMoment = moment(fechaFormateada, "MM/DD/YYYY");

    // Verificar si la fecha es válida
    if (fechaMoment.isValid()) {
      // La fecha es válida, puedes utilizarla
      return fechaMoment.toDate();
    } else {
      // La fecha es inválida, maneja el caso en consecuencia
      return null;
    }
  }

  function textParser(texto: string): string {
    const textoSinEspacios = texto.replace(/^\s+|\s+$/g, "");
    const textoEnMayusculas = textoSinEspacios.toUpperCase();
    return textoEnMayusculas;
  }

  return (
    <div className={styles.background}>
      <form>
        <div className={styles.close}>
          <h4>Importar conciliaciones</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <input
          className="form-control"
          type="file"
          placeholder="Importar conciliaciones"
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
}
