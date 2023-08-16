import * as XLSX from "xlsx";
import swal from "sweetalert";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  RequirementsDetail,
  RequirementsHeads,
} from "../../../../../interfaces/Requirements/data";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";

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
            .forEach((item: any) => (item[0] ? data.push(item) : null));

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
    let newData: RequirementsDetail[] = [];
    let concecutivos: number[] = [];

    data.forEach((requirements: any, i: number) => {
      // Save data to check
      const concecutivo = Number(requirements[0]);

      // Check if 'concecutivo' already exist
      if (concecutivos.some((number) => number === concecutivo))
        throw new Error(
          `El consecutivo de la fila ${i + 1} ya existe: (${concecutivo})`
        );

      // Add idSiproj and nroRequirements to list
      concecutivos.push(concecutivo);

      const currentData: RequirementsDetail = {
        consecutivo: Number(requirements[0]) || 0,
        fechaNotificacion: newDate(requirements[1]),
        radicadoSipa: textParser(requirements[2] || ""),
        otrosRadicadosSipa: textParser(requirements[3] || ""),
        remitenteGeneral: textParser(requirements[4] || ""),
        remitenteEspecifico: textParser(requirements[5] || ""),
        direccion: textParser(requirements[6] || ""),
        concepto: textParser(requirements[7] || ""),
        tipoProceso: textParser(requirements[8] || ""),
        numeroProceso: textParser(requirements[9] || ""),
        abogado: textParser(requirements[10] || ""),
        fechaVencimiento: newDate(requirements[11]),
        solicitudDadep: textParser(requirements[12] || ""),
        areaApoyo: textParser(requirements[13] || ""),
        solicitudConcepto: textParser(requirements[14] || ""),
        respuestaSolicitud: textParser(requirements[15] || ""),
        fechaRespuesta: newDate(requirements[16]),
        respuestaSipa: textParser(requirements[17] || ""),
        estado: textParser(requirements[18] || ""),
        observaciones: textParser(requirements[19] || ""),
      };

      console.log(currentData);
      newData.push(currentData);
    });

    return {
      head: newData.map(
        (item: RequirementsDetail): RequirementsHeads => ({
          radicadoSipa: item.radicadoSipa,
          abogado: item.abogado,
          tipoProceso: item.tipoProceso,
          numeroProceso: item.numeroProceso,
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
          <h4>Importar requerimientos</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <input
          className="form-control"
          type="file"
          placeholder="Importar movimientos"
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
}
