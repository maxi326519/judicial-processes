import * as XLSX from "xlsx";

import styles from "./ImportExcel.module.css";
import { JudicialProcesses, ProcessesDetails, ProcessesState } from "../../../../../interfaces/JudicialProcesses";
import { Timestamp } from "firebase/firestore";

interface Props {
  handleData: (data: any) => void;
  handleClose: () => void;
}

export default function ImportExcel({ handleData, handleClose }: Props) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const workbook = XLSX.read(e.target?.result, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const worksheetData: any = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          });
          let data: any = [];
          worksheetData
            .slice(2)
            .forEach((item: any) => (item[2] ? data.push(item) : null));

          handleData(dataConvert(data));
          handleClose();
        };
        reader.readAsBinaryString(event.target.files[0]);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  function dataConvert(data: any) {
    let newData: ProcessesDetails[] = [];

    data.forEach((processes: any) => {
      newData.push({
        apoderadoActual: processes[0] || "",
        apoderadoAnterior: processes[1] || "",
        idSiproj: Number(processes[2]) || 0,
        procesoAltoImpacto: processes[3] || "",

        radRamaJudicialInicial: processes[4] || "",
        radRamaJudicialActual: processes[5] || "",

        tipoProceso: processes[6] || "",

        diasTerminoContestacion: Number(processes[7]) || 0,
        fechaNotificacion: newDate(processes[8]),
        fechaAdmision: newDate(processes[9]),
        fechaContestacion: newDate(processes[10]),
        fechaLimiteProbContestacion: newDate(processes[11]),
        validacionContestacion: processes[12] || "",

        calidadActuacionEntidad: processes[13] || "",

        demandados: processes[14] || "",
        idDemanante: Number(processes[15]) || 0,
        demandante: processes[16] || "",
        despachoInicial: processes[17] || "",
        despachoActual: processes[18] || "",

        posicionSDP: processes[19] || "",
        temaGeneral: processes[20] || "",

        pretensionAsunto: processes[21] || "",

        cuantiaEstimada: Number(processes[22]) || 0,
        valorPretensionesSMLVM: Number(processes[23]) || 0,

        instanciaProceso: processes[24] || "",
        fechaProceso: newDate(processes[25]),
        ultimoEstadoProceso: processes[26] || "",
        etapaProcesal: processes[27] || "",

        fechaFalloPrimeraInstancia: newDate(processes[28]),
        sentidoFalloPrimeraInstancia: processes[29] || "",
        resumenPrimeraInstancia: processes[30] || "",
        fechaPresentacionRecurso: newDate(processes[31]),
        fechaFalloSegundaInstancia: newDate(processes[32]),
        sentidoFalloSegundaInstancia: processes[33] || "",
        resumenSegundaInstancia: processes[34] || "",

        incidente: processes[35] || "",
        estadoIncidente: processes[36] || "",
        resumenIncidente: processes[37] || "",

        observaciones: processes[38] || "",

        calificacionContingente: processes[39] || "",
        estado: processes[40] || ProcessesState.Activo,
        fechaTerminacion: newDate(processes[41]),
      });
    });

    return {
      head: newData.map((item: any) => ({
        idSiproj: item.idSiproj,
        estado: item.estado,
        apoderadoActual: item.apoderadoActual,
        radRamaJudicialInicial: item.radRamaJudicialInicial,
        radRamaJudicialActual: item.radRamaJudicialActual,
        demandante: item.demandante,
      })),
      details: newData,
    };
  }

  function newDate(date: string) {
    return date ? Timestamp.fromDate(new Date(date)) : null;
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
