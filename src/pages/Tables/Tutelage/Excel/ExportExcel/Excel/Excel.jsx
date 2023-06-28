import ReactExport from "react-export-excel";
import { useState } from "react";

import style from "./Excel.module.css";
import exportSvg from "../../../../../../assets/svg/export.svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataLabels = [
  {
    name: "idSiproj",
    label: "ID Siproj",
  },
  {
    name: "nroTutela",
    label: "Nro de tutela",
  },
  {
    name: "abogado",
    label: "Abogado",
  },
  {
    name: "tipo",
    label: "Tipo de tutela",
  },
  {
    name: "fecha",
    label: "Fecha",
  },
  {
    name: "radicado",
    label: "Radicado",
  },
  {
    name: "demandanteId",
    label: "Identificación del demandante",
  },
  {
    name: "demandante",
    label: "Demandante",
  },
  {
    name: "demandado",
    label: "Demandado",
  },
  {
    label: "Tema de la tutela",
    inputType: "select",
  },
  {
    name: "derechoVulnerado",
    label: "Derecho vulnerado",
  },
  {
    name: "extranjero",
    label: "Extranjero",
  },
  {
    name: "concepto",
    label: "Concepto",
  },
  {
    name: "termino",
    label: "Término",
  },
  {
    name: "remite",
    label: "Remite",
  },
  {
    name: "fechaVencimiento",
    label: "Fecha de vencimiento",
  },
  {
    name: "fechaRespuesta",
    label: "Fecha de respuesta",
  },
  {
    name: "radicadoSalida",
    label: "Radicado de salida",
  },
  {
    name: "validacionRespuesta",
    label: "Validacion de la respuesta",
  },
  {
    name: "oficioAdicional",
    label: "Oficio adicional",
  },
  {
    name: "fallo1raInst",
    label: "Fallo de la 1ra instancia",
  },
  {
    name: "fechaFallo1raInst",
    label: "Fecha del fallo de la 1ra instancia",
  },
  {
    name: "observacionFallo1raInst",
    label: "Observación del fallo de la 1ra instancia",
  },
  {
    name: "terminoCumplimiento1raInst",
    label: "Término de cumplimiento de la 1ra instancia",
  },
  {
    name: "cumplimiento1raInst",
    label: "Cumplimiento de la 1ra instancia",
  },
  {
    name: "fechaCumplimiento1raInst",
    label: "Fecha de cumplimiento de la 1ra instancia",
  },
  {
    name: "impugnacionSDP",
    label: "Impugnacion SDP",
  },
  {
    name: "fechaImpugnacion",
    label: "Fecha de impugnación",
  },
  {
    name: "fallo2daInst",
    label: "Fallo de la 2da instancia",
  },
  {
    name: "fechaFallo2daInst",
    label: "Fecha de fallo de la 2da instancia",
  },
  {
    name: "observacionFallo2daInst",
    label: "Observación fallo de la 2da instancia",
  },
  {
    name: "terminoCumplimiento2daInst",
    label: "Término de cumplimiento de la 2da instancia",
  },
  {
    name: "cumplimiento2daInst",
    label: "Cumplimiento de la 2da instancia",
  },
  {
    name: "fechaCumplimiento2daInst",
    label: "Fecha cumplimiento de la 2da instancia",
  },
  {
    name: "incidenteDesacato",
    label: "Incidente de desacato",
  },
  {
    name: "observacionesGenerales",
    label: "Observaciones generales",
  },
];

export default function Excel({ data, handleClose }) {
  const [filename, setFilename] = useState("Tutelas");

  /*   useEffect(() => {
    if (state === "ACTIVO") setFilename("Procesos activos");
    if (state === "TERMINADO") setFilename("Procesos terminados");
    if (state === "") setFilename("Procesos");
  }, [state]); */

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
        {dataLabels.map((data) => (
          <ExcelColumn label={data.name} value={data.values} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
}
