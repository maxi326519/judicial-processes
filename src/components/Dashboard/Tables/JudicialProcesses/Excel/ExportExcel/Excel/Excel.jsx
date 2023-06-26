import ReactExport from "react-export-excel";
import { useEffect, useState } from "react";

import style from "./Excel.module.css";
import exportSvg from "../../../../../../../assets/svg/export.svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Excel({data, state, handleClose}) {
  const [filename, setFilename] = useState("");

  useEffect(() => {
    if (state === "ACTIVO") setFilename("Procesos activos");
    if (state === "TERMINADO") setFilename("Procesos terminados");
    if (state === "") setFilename("Procesos");
  }, [state]);

  return (
    <ExcelFile
      element={
        <button
          className={`btn btn-outline-primary ${style.export}`}
          type="button"
          onClick={handleClose}
        >
          <img src={exportSvg} alt="export" />
          <span>Export</span>
        </button>
      }
      filename={filename}
    >
      <ExcelSheet data={data} name="Employees">
        <ExcelColumn label="APODERADO ACTUAL" value="apoderadoActual" />
        <ExcelColumn label="APODERADO ANTERIOR" value="apoderadoAnterior" />
        <ExcelColumn label="ID SIPROJ" value="idSiproj" />
        <ExcelColumn
          label="PROCESO DE ALTO IMPACTO"
          value="procesoAltoImpacto"
        />
        <ExcelColumn
          label="RAD. RAMA JUDICIAL INICIAL"
          value="radRamaJudicialInicial"
        />
        <ExcelColumn
          label="RAD. RAMA JUDICIAL ACTUAL"
          value="radRamaJudicialActual"
        />
        <ExcelColumn label="TIPO DE PROCESO" value="tipoProceso" />
        <ExcelColumn
          label="DÍAS TERMINOS DE CONTESTACIÓN"
          value="diasTerminoContestacion"
        />
        <ExcelColumn
          label="FECHA DE NOTIFICACIÓN DE LA DEMANDA"
          value="fechaNotificacion"
        />
        <ExcelColumn label="FECHA DE ADMISIÓN DEMANDA" value="fechaAdmision" />
        <ExcelColumn
          label="FECHA DE CONTESTACIÓN DEMANDA"
          value="fechaContestacion"
        />
        <ExcelColumn
          label="FECHA LÍMITE PROBALBE DE CONTESTACIÓN"
          value="fechaLimiteProbContestacion"
        />
        <ExcelColumn
          label="VALIDACION DE CONTESTACIÓN"
          value="validacionContestacion"
        />
        <ExcelColumn
          label="CALIDAD EN QUE ACTÚA LA ENTIDAD"
          value="calidadActuacionEntidad"
        />
        <ExcelColumn label="DEMANDADOS" value="demandados" />
        <ExcelColumn label="ID DEL DEMANDANTE" value="idDemanante" />
        <ExcelColumn label="DEMANDANTE" value="demandante" />
        <ExcelColumn label="DESPACHO INICIAL" value="despachoInicial" />
        <ExcelColumn label="DESPACHO ACTUAL" value="despachoActual" />
        <ExcelColumn label="POSICION DE LA SDP" value="posicionSDP" />
        <ExcelColumn label="TEMA GENERAL" value="temaGeneral" />
        <ExcelColumn label="PRETENSION-ASUNTO" value="pretensionAsunto" />
        <ExcelColumn label="CUANTÍA ESTIMADA" value="cuantiaEstimada" />
        <ExcelColumn
          label="VALOR DE LAS PRETENSIONES SMLVM"
          value="valorPretensionesSMLVM"
        />
        <ExcelColumn label="INSTANCIA DEL PROCESO" value="instanciaProceso" />
        <ExcelColumn label="FECHA" value="fechaProceso" />
        <ExcelColumn
          label="ÚLTIMO ESTADO DEL PROCESO"
          value="ultimoEstadoProceso"
        />
        <ExcelColumn label="ETAPA PROCESAL" value="etapaProcesal" />
        <ExcelColumn
          label="FECHA DE FALLO PRIMERA INSTANCIA"
          value="fechaFalloPrimeraInstancia"
        />
        <ExcelColumn
          label="SENTIDO DE FALLO PRIMERA INSTANCIA"
          value="sentidoFalloPrimeraInstancia"
        />
        <ExcelColumn
          label="RESUMEN PRIMERA INSTANCIA"
          value="resumenPrimeraInstancia"
        />
        <ExcelColumn
          label="FECHA DE PRESENTACIÓN DEL RECURSO"
          value="fechaPresentacionRecurso"
        />
        <ExcelColumn
          label="FECHA DE FALLO SEGUNDA INSTANCIA"
          value="fechaFalloSegundaInstancia"
        />
        <ExcelColumn
          label="SENTIDO DE FALLO DE LA SEGUNDA INSTANCIA"
          value="sentidoFalloSegundaInstancia"
        />
        <ExcelColumn
          label="RESUMEN SEGUNDA INSTANCIA"
          value="resumenSegundaInstancia"
        />
        <ExcelColumn label="INCIDENTE" value="incidente" />
        <ExcelColumn label="ESTADO DEL INCIDENTE" value="estadoIncidente" />
        <ExcelColumn label="RESUMEN DEL INCIDENTE" value="resumenIncidente" />
        <ExcelColumn label="OBSERVACIONES-COMENTARIOS" value="observaciones" />
        <ExcelColumn
          label="CALIFICACIÓN CONTINGENTE"
          value="calificacionContingente"
        />
        <ExcelColumn label="ESTADO" value="estado" />
        <ExcelColumn label="FECHA DE TERMINACIÓN" value="fechaTerminacion" />
      </ExcelSheet>
    </ExcelFile>
  );
}
