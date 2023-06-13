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
        apoderadoActual: processes[0].toUpperCase() || "",
        apoderadoAnterior: processes[1].toUpperCase() || "",
        idSiproj: Number(processes[2]) || 0,
        procesoAltoImpacto: processes[3].toUpperCase() || "",

        radRamaJudicialInicial: processes[4].toUpperCase() || "",
        radRamaJudicialActual: processes[5].toUpperCase() || "",

        tipoProceso: processes[6].toUpperCase() || "",

        diasTerminoContestacion: Number(processes[7]) || 0,
        fechaNotificacion: newDate(processes[8]),
        fechaAdmision: newDate(processes[9]),
        fechaContestacion: newDate(processes[10]),
        fechaLimiteProbContestacion: newDate(processes[11]),
        validacionContestacion: processes[12].toUpperCase() || "",

        calidadActuacionEntidad: processes[13].toUpperCase() || "",

        demandados: processes[14].toUpperCase() || "",
        idDemanante: Number(processes[15]) || 0,
        demandante: processes[16].toUpperCase() || "",
        despachoInicial: processes[17].toUpperCase() || "",
        despachoActual: processes[18].toUpperCase() || "",

        posicionSDP: processes[19].toUpperCase() || "",
        temaGeneral: processes[20].toUpperCase() || "",

        pretensionAsunto: processes[21].toUpperCase() || "",

        cuantiaEstimada: Number(processes[22]) || 0,
        valorPretensionesSMLVM: Number(processes[23]) || 0,

        instanciaProceso: processes[24].toUpperCase() || "",
        fechaProceso: newDate(processes[25]),
        ultimoEstadoProceso: processes[26].toUpperCase() || "",
        etapaProcesal: processes[27].toUpperCase() || "",

        fechaFalloPrimeraInstancia: newDate(processes[28]),
        sentidoFalloPrimeraInstancia: processes[29].toUpperCase() || "",
        resumenPrimeraInstancia: processes[30].toUpperCase() || "",
        fechaPresentacionRecurso: newDate(processes[31]),
        fechaFalloSegundaInstancia: newDate(processes[32]),
        sentidoFalloSegundaInstancia: processes[33].toUpperCase() || "",
        resumenSegundaInstancia: processes[34].toUpperCase() || "",

        incidente: processes[35].toUpperCase() || "",
        estadoIncidente: processes[36].toUpperCase() || "",
        resumenIncidente: processes[37].toUpperCase() || "",

        observaciones: processes[38].toUpperCase() || "",

        calificacionContingente: processes[39].toUpperCase() || "",
        estado: processes[40].toUpperCase() || ProcessesState.Activo,
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
