import ReactExport from "react-export-excel";

import style from "./Excel.module.css";
import exportSvg from "../../../../../../assets/svg/export.svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataLabels = [
  { value: "id", label: "ID" },
  { value: "fechaIngresoSolicitud", label: "Fecha de ingreso solicitud" },
  { value: "radicadoSIPA", label: "Radicado SIPA" },
  { value: "convocante", label: "Convocante" },
  { value: "medioControl", label: "Medio de Control" },
  { value: "pretension", label: "Pretensión" },
  { value: "valorEstimado", label: "Valor estimado" },
  { value: "asignacionAbogado", label: "Asignacion abogado" },
  { value: "estadoSolicitud", label: "Estado de la solicitud" },
  { value: "terminoLegal", label: "Término legal" },
  { value: "consecutivo", label: "Consecutivo" },
  {
    value: "radicadosSIPASolicitud",
    label: "Radicados SIPA Solicitud de insumo",
  },
  {
    value: "radicadosSIPARespuesta",
    label: "Radicados SIPA Respuesta de insumo",
  },
  { value: "fechaComite", label: "Fecha de Comité" },
  { value: "desicionComite", label: "Desición de Comité" },
  { value: "estadoAudiencia", label: "Estado audiencia" },
  { value: "procuraduriaRemitente", label: "Procuraduría Remitente" },
  { value: "numeroSolicitud", label: "Número de solicitud" },
  { value: "fechaCitacionAudiencia", label: "Fecha de citación o audiencia" },
  { value: "observaciones", label: "Observaciones" },
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
      filename="Conciliaciones"
    >
      <ExcelSheet data={data} name="Employees">
        {dataLabels.map((data) => (
          <ExcelColumn label={data.label} value={data.value} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
}
