import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import {
  ProcessDetails,
  ProcessHeads,
  ProcessState,
} from "../../../../../interfaces/Processes/data";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
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
            .forEach((item: any) => (item[2] ? data.push(item) : null));

          const convert = dataConvert(data);
          handleData(convert);
          handleClose();

          dispatch(closeLoading());
        } catch (err: any) {
          console.log(err);
          dispatch(closeLoading());

          if (
            err.message.includes("La fila") ||
            err.message.includes("El id")
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
    let newData: ProcessDetails[] = [];
    let idList: number[] = [];

    data.forEach((processes: any, i: number) => {
      const idSiproj = Number(processes[2]);
      if (!idSiproj)
        throw new Error(
          `La fila ${i} tiene problemas con el id: (${processes[2]})`
        );
      if (idList.some((id) => id === idSiproj))
        throw new Error(`El id ${idSiproj} ya existe`);
      idList.push(idSiproj);

      const currentData = {
        apoderadoActual: textParser(processes[0] || ""),
        apoderadoAnterior: textParser(processes[1] || ""),
        idSiproj: Number(processes[2]) || 0,
        procesoAltoImpacto: textParser(processes[3] || ""),

        radRamaJudicialInicial: textParser(processes[4] || ""),
        radRamaJudicialActual: textParser(processes[5] || ""),

        tipoProceso: textParser(processes[6] || ""),

        diasTerminoContestacion: Number(processes[7]) || 0,
        fechaNotificacion: newDate(processes[8]),
        fechaAdmision: newDate(processes[9]),
        fechaContestacion: newDate(processes[10]),
        fechaLimiteProbContestacion: newDate(processes[11]),
        validacionContestacion: textParser(processes[12] || ""),

        calidadActuacionEntidad: textParser(processes[13] || ""),

        demandados: textParser(processes[14] || ""),
        idDemanante: Number(processes[15]) || 0,
        demandante: textParser(processes[16] || ""),
        despachoInicial: textParser(processes[17] || ""),
        despachoActual: textParser(processes[18] || ""),

        posicionSDP: textParser(processes[19] || ""),
        temaGeneral: textParser(processes[20] || ""),

        pretensionAsunto: textParser(processes[21] || ""),

        cuantiaEstimada: Number(processes[22]!.replace(/[$, ]/g, "")) || 0,
        valorPretensionesSMLVM: Number(processes[23]) || 0,

        instanciaProceso: textParser(processes[24] || ""),
        fechaProceso: newDate(processes[25]),
        ultimoEstadoProceso: textParser(processes[26] || ""),
        etapaProcesal: textParser(processes[27] || ""),

        fechaFalloPrimeraInstancia: newDate(processes[28]),
        sentidoFalloPrimeraInstancia: textParser(processes[29] || ""),
        resumenPrimeraInstancia: textParser(processes[30] || ""),
        fechaPresentacionRecurso: newDate(processes[31]),
        fechaFalloSegundaInstancia: newDate(processes[32]),
        sentidoFalloSegundaInstancia: textParser(processes[33] || ""),
        resumenSegundaInstancia: textParser(processes[34] || ""),

        incidente: textParser(processes[35] || ""),
        estadoIncidente: textParser(processes[36] || ""),
        resumenIncidente: textParser(processes[37] || ""),

        observaciones: textParser(processes[38] || ""),

        calificacionContingente: textParser(processes[39] || ""),
        estado:
          (textParser(processes[40]) as ProcessState) || ProcessState.Activo,
        fechaTerminacion: newDate(processes[41]),
      };

      newData.push(currentData);
    });

    return {
      head: newData.map((item: ProcessDetails): ProcessHeads => ({
        idSiproj: item.idSiproj,
        estado: item.estado,
        tipoProceso: item.tipoProceso,
        apoderadoActual: item.apoderadoActual,
        radRamaJudicialInicial: item.radRamaJudicialInicial,
        radRamaJudicialActual: item.radRamaJudicialActual,
        demandante: item.demandante,
        posicionSDP: item.posicionSDP
      })),
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
