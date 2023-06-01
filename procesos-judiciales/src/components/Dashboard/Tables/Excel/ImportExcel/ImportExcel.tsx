import * as XLSX from "xlsx";

import styles from "./ImportExcel.module.css";
import { ProcessesDetails } from "../../../../../interfaces/JudicialProcesses";
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
        apoderadoActual: processes[0],
        apoderadoAnterior: processes[1],
        idSiproj: Number(processes[2]) || 0,
        procesoAltoImpacto: processes[3],

        radRamaJudicialInicial: processes[4],
        radRamaJudicialActual: processes[5],

        tipoProceso: processes[6],

        diasTerminoContestacion: Number(processes[7]) || 0,
        fechaNotificacion: newDate(processes[8]),
        fechaContestacion: newDate(processes[9]),
        fechaLimiteProbContestacion: newDate(processes[10]),
        validacionContestacion: processes[11],

        calidadActuacionEntidad: processes[12],

        demandados: processes[13],
        idDemanante: Number(processes[14]) || 0,
        demandante: processes[15],
        despachoInicial: processes[16],
        despachoActual: processes[17],

        posicionSDP: processes[18],
        temaGeneral: processes[19],

        pretensionAsunto: processes[20],

        cuantiaEstimada: Number(processes[21]) || 0,
        valorPretensionesSMLVM: Number(processes[22]) || 0,

        instanciaProceso: processes[23],
        fechaProceso: newDate(processes[24]),
        ultimoEstadoProceso: processes[25],
        etapaProcesal: processes[26],

        fechaFalloPrimeraInstancia: newDate(processes[27]),
        sentidoFalloPrimeraInstancia: processes[28],
        resumenPrimeraInstancia: processes[29],
        fechaPresentacionRecurso: newDate(processes[30]),
        fechaFalloSegundaInstancia: newDate(processes[31]),
        sentidoFalloSegundaInstancia: processes[32],
        resumenSegundaInstanciaL: processes[33],

        incidente: processes[34],
        estadoIncidente: processes[35],
        resumenIncidente: processes[36],

        observaciones: processes[37],

        calificacionContingente: processes[38],
        estado: processes[39],
        fechaTerminacion: newDate(processes[40]),
      });
    });

    return {
      head: newData,
      details: newData.map((item: any) => ({
        idSiproj: item.idSiproj,
        radRamaJudicialInicial: item.radRamaJudicialInicial,
        radRamaJudicialActual: item.radRamaJudicialActual,
        demandante: item.demandante,
      })),
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
