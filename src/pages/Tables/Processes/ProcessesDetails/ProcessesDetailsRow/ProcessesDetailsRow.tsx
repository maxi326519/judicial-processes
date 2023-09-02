import { dateToString } from "../../../../../functions/dateToString";
import { DetalleRadicacion } from "../../../../../interfaces/Processes/lists";

import style from "./ProcessesDetailsRow.module.css";

interface Props {
  actuacion: DetalleRadicacion;
}

export default function ProcessesDetailsRow({ actuacion }: Props) {
  return (
    <div className={style.row}>
      <span>{actuacion.fechaActuacion ? dateToString(new Date(actuacion.fechaActuacion)) : "-"}</span>
      <span>{actuacion.actuacion}</span>
      <span>{actuacion.anotacion}</span>
      <span>{actuacion.fechaInicial ? dateToString(new Date(actuacion.fechaInicial)) : "-"}</span>
      <span>{actuacion.fechaFinal ? dateToString(new Date(actuacion.fechaFinal)) : "-"}</span>
      <span>{actuacion.fechaRegistro ? dateToString(new Date(actuacion.fechaRegistro)) : "-"}</span>
    </div>
  );
}
