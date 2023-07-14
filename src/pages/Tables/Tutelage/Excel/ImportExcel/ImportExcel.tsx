import * as XLSX from "xlsx";
import swal from "sweetalert";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  TutelaDetails,
  TutelaHeads,
} from "../../../../../interfaces/Tutelas/data";
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
    let newData: TutelaDetails[] = [];
    let idList: number[] = [];
    let nroList: string[] = [];
    let radicadoList: string[] = [];

    data.forEach((processes: any, i: number) => {
      // Save data to check
      const idSiproj = Number(processes[21]);
      const nroTutela = processes[11];
      const radicado = processes[3];

      // Check if idSiproj already exist
      if (idList.some((id) => id === idSiproj))
        throw new Error(`El id de la fila ${i + 1} ya existe: (${idSiproj})`);

      // Check if radicado already exist
      if (radicadoList.some((radicadoItem) => radicadoItem === radicado))
        throw new Error(
          `El radicado de la fila ${i + 1} ya existe: (${radicado})`
        );

      // Check if nroTutela already exist
      /*       if (nroList.some((nro) => nro === nroTutela))
        throw new Error(`El numero ${i + 1} ya existe: (${radicado})`); */

      // Add idSiproj and nroTutela to list
      idList.push(idSiproj);
      nroList.push(nroTutela);

      if (radicado !== "NO TIENE NUMERO SIPA") {
        radicadoList.push(radicado);
      }

      const currentData: TutelaDetails = {
        tipo: textParser(processes[0] || ""),
        fecha: combineDateAndTime(processes[1], processes[2] || "00:00:00"),
        radicado: textParser(processes[3] || ""),
        demandanteId: textParser(processes[4] || ""),
        demandante: textParser(processes[5] || ""),
        demandado: textParser(processes[6] || ""),
        temaTutela: textParser(processes[7] || ""),
        derechoVulnerado: textParser(processes[8] || ""),
        extranjero: processes[9] === "SI" ? true : false,
        concepto: textParser(processes[10] || ""),
        nroTutela: textParser(processes[11] || ""),
        termino: textParser(processes[12] || ""),
        remite: textParser(processes[13] || ""),
        abogado: textParser(processes[14] || ""),
        fechaVencimiento: combineDateAndTime(
          processes[15],
          processes[16] || "00:00:00"
        ),
        fechaRespuesta: newDate(processes[17]),
        radicadoSalida: textParser(processes[19] || ""),
        validacionRespuesta: textParser(processes[20] || ""),
        idSiproj: Number(processes[21]) || 0,
        oficioAdicional: textParser(processes[22] || ""),
        fallo1raInst: textParser(processes[23] || ""),
        fechaFallo1raInst: newDate(processes[24]),
        observacionFallo1raInst: textParser(processes[25] || ""),
        terminoCumplimiento1raInst: Number(processes[26]) || 0,
        cumplimiento1raInst: textParser(processes[27] || ""),
        fechaCumplimiento1raInst: newDate(processes[28]),
        impugnacionSDP: Number(processes[29]) || 0,
        fechaImpugnacion: newDate(processes[30]),
        fallo2daInst: textParser(processes[31] || ""),
        fechaFallo2daInst: newDate(processes[32]),
        observacionFallo2daInst: textParser(processes[33] || ""),
        terminoCumplimiento2daInst: Number(processes[34]) || 0,
        cumplimiento2daInst: textParser(processes[35] || ""),
        fechaCumplimiento2daInst: newDate(processes[36]),
        incidenteDesacato: textParser(processes[37] || ""),
        observacionesGenerales: textParser(processes[38] || ""),
      };

      console.log(currentData);
      newData.push(currentData);
    });

    return {
      head: newData.map(
        (item: TutelaDetails): TutelaHeads => ({
          idSiproj: item.idSiproj,
          nroTutela: item.nroTutela,
          abogado: item.abogado,
          temaTutela: item.temaTutela,
          demandanteId: item.demandanteId,
          demandante: item.demandante,
          derechoVulnerado: item.derechoVulnerado,
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

  function combineDateAndTime(date: string, time: string): Date | null {
    // Check date
    const combinedDate = newDate(date);
    if (combinedDate === null) return null;

    // Check teim format HH:MM:SS
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeRegex.test(time)) return combinedDate;

    // Time destructuring
    const [hours, minutes, seconds] = time.split(":");

    // Set hours
    combinedDate.setHours(Number(hours), Number(minutes), Number(seconds));

    return combinedDate;
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
          <h4>Importar procesos</h4>
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
