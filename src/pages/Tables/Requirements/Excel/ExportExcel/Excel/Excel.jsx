import ReactExport from "react-export-excel";

import style from "./Excel.module.css";
import exportSvg from "../../../../../../assets/svg/export.svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataLabels = [
  { value: "consecutivo", label: "Consecutivo" },
  { value: "fechaNotificacion", label: "Fecha notificación" },
  { value: "radicadoSipa", label: "Radicado SIPA" },
  { value: "otrosRadicadosSipa", label: "Otros radicados en SIPA" },
  { value: "remitenteGeneral", label: "Remitente general" },
  { value: "remitenteEspecifico", label: "Remitente específico" },
  { value: "direccion", label: "Dirección" },
  { value: "concepto", label: "Concepto" },
  { value: "tipoProceso", label: "Tipo de proceso" },
  { value: "numeroProceso", label: "Numero de proceso" },
  { value: "abogado", label: "Abogado" },
  { value: "fechaVencimiento", label: "Fecha de vencimiento" },
  { value: "solicitudDadep", label: "Solicitud Dadep" },
  { value: "areaApoyo", label: "Area de apoyo" },
  { value: "solicitudConcepto", label: "Solicitud concepto" },
  { value: "respuestaSolicitud", label: "Respuesta solicitud" },
  { value: "fechaRespuesta", label: "Fecha de respuesta" },
  { value: "respuestaSipa", label: "Respuesta SIPA" },
  { value: "estado", label: "Estado" },
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
      filename="Requerimientos"
    >
      <ExcelSheet data={data} name="Employees">
        {dataLabels.map((data) => (
          <ExcelColumn label={data.label} value={data.value} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
}
