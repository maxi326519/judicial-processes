import { useState } from "react";
import ReactExport from "react-export-excel";

import style from "./Excel.module.css";
import exportSvg from "../../../../../../assets/svg/export.svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataLabels = [
  {
    value: "id",
    lvae: "id",
  },
  {
    value: "Fecha de Radicacion",
    lvae: "fechaRadicacion",
  },
  {
    value: "radicadoSipa",
    lvae: "radicadoSipa",
  },
  {
    value: "abogado",
    lvae: "abogado",
  },
  {
    value: "concepto",
    lvae: "concepto",
  },
  {
    value: "proceso",
    lvae: "proceso",
  },
  {
    value: "numero",
    lvae: "numero",
  },
  {
    value: "accionante",
    lvae: "accionante",
  },
  {
    value: "observaciones",
    lvae: "observaciones",
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
