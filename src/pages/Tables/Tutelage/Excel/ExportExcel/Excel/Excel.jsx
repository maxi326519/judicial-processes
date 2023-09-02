import { useState } from "react";
import ReactExport from "react-export-excel";

import style from "./Excel.module.css";
import exportSvg from "../../../../../../assets/svg/export.svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataLabels = [
  {
    value: "tipo",
    label: "Tipo de tutela",
  },
  {
    value: "fecha",
    label: "Fecha de notificacion",
  },
  {
    value: "fechaHora",
    label: "Hora de notificacion",
  },
  {
    value: "radicado",
    label: "Radicado",
  },
  {
    value: "demandanteId",
    label: "Identificación del demandante",
  },
  {
    value: "demandante",
    label: "Demandante",
  },
  {
    value: "demandado",
    label: "Demandado",
  },
  {
    value: "temaTutela",
    label: "Tema de la tutela",
  },
  {
    value: "derechoVulnerado",
    label: "Derecho vulnerado",
  },
  {
    value: "extranjero",
    label: "Extranjero",
  },
  {
    value: "concepto",
    label: "Concepto",
  },
  {
    value: "nroTutela",
    label: "Nro de tutela",
  },
  {
    value: "termino",
    label: "Término",
  },
  {
    value: "remite",
    label: "Remite",
  },
  {
    value: "abogado",
    label: "Abogado",
  },
  {
    value: "fechaVencimiento",
    label: "Fecha de vencimiento",
  },
  {
    value: "fechaVencimientoHora",
    label: "Hora de vencimiento",
  },
  {
    value: "fechaRespuesta",
    label: "Fecha de respuesta",
  },
  {
    value: "fechaRespuestaHora",
    label: "Hora de respuesta",
  },
  {
    value: "radicadoSalida",
    label: "Radicado de salida",
  },
  {
    value: "validacionRespuesta",
    label: "Validacion de la respuesta",
  },
  {
    value: "idSiproj",
    label: "ID Siproj",
  },
  {
    value: "oficioAdicional",
    label: "Oficio adicional",
  },
  {
    value: "fallo1raInst",
    label: "Fallo de la 1ra instancia",
  },
  {
    value: "fechaFallo1raInst",
    label: "Fecha del fallo de la 1ra instancia",
  },
  {
    value: "observacionFallo1raInst",
    label: "Observación del fallo de la 1ra instancia",
  },
  {
    value: "terminoCumplimiento1raInst",
    label: "Término de cumplimiento de la 1ra instancia",
  },
  {
    value: "cumplimiento1raInst",
    label: "Cumplimiento de la 1ra instancia",
  },
  {
    value: "fechaCumplimiento1raInst",
    label: "Fecha de cumplimiento de la 1ra instancia",
  },
  {
    value: "impugnacionSDP",
    label: "Impugnacion SDP",
  },
  {
    value: "fechaImpugnacion",
    label: "Fecha de impugnación",
  },
  {
    value: "fallo2daInst",
    label: "Fallo de la 2da instancia",
  },
  {
    value: "fechaFallo2daInst",
    label: "Fecha de fallo de la 2da instancia",
  },
  {
    value: "observacionFallo2daInst",
    label: "Observación fallo de la 2da instancia",
  },
  {
    value: "terminoCumplimiento2daInst",
    label: "Término de cumplimiento de la 2da instancia",
  },
  {
    value: "cumplimiento2daInst",
    label: "Cumplimiento de la 2da instancia",
  },
  {
    value: "fechaCumplimiento2daInst",
    label: "Fecha cumplimiento de la 2da instancia",
  },
  {
    value: "incidenteDesacato",
    label: "Incidente de desacato",
  },
  {
    value: "observacionesGenerales",
    label: "Observaciones generales",
  },
];

export default function Excel({ data, handleClose }) {
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
      filename="Tutelas"
    >
      <ExcelSheet data={data} name="Employees">
        {dataLabels.map((data) => (
          <ExcelColumn label={data.label} value={data.value} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
}
