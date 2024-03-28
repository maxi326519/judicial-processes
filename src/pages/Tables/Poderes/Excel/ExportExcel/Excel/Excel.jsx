import ReactExport from "react-export-excel";

import style from "./Excel.module.css";
import exportSvg from "../../../../../../assets/svg/export.svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataLabels = [
  {
    value: "Fecha de Radicacion",
    label: "fechaRadicacion",
  },
  {
    value: "radicadoSipa",
    label: "Radicado Sipa",
  },
  {
    value: "abogado",
    label: "Abogado",
  },
  {
    value: "concepto",
    label: "Concepto",
  },
  {
    value: "proceso",
    label: "Proceso",
  },
  {
    value: "numero",
    label: "Numero",
  },
  {
    value: "accionante",
    label: "Accionante",
  },
  {
    value: "observaciones",
    label: "Observaciones",
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
      filename="Poderes"
    >
      <ExcelSheet data={data} name="Employees">
        {dataLabels.map((data) => (
          <ExcelColumn label={data.label} value={data.value} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
}
