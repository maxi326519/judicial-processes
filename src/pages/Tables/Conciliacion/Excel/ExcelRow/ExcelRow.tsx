import { ConciliacionesHeads } from "../../../../../interfaces/Conciliaciones/data";
import { dateToString } from "../../../../../functions/dateToString";

import style from "./ExcelRow.module.css";

interface Props {
  conciliacion: ConciliacionesHeads;
}

export default function ExcelRow({ conciliacion }: Props) {
  return (
    <tr className={style.row}>
      <td>{conciliacion.id}</td>
      <td>{dateToString(conciliacion.fechaIngresoSolicitud)}</td>
      <td>{conciliacion.radicadoSIPA}</td>
    </tr>
  );
}
