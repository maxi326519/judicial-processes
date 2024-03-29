import { dateToString } from "../../../../../functions/dateToString";
import { TutelaHeads } from "../../../../../interfaces/Tutelas/data";

import style from "./ExcelRow.module.css";

interface Props {
  tutela: TutelaHeads;
}

export default function ExcelRow({ tutela }: Props) {
  return (
    <tr className={style.row}>
      <td>{tutela.idSiproj}</td>
      <td>{tutela.fechaNotificacion && dateToString(tutela.fechaNotificacion)}</td>
      <td>{tutela.nroTutela}</td>
      <td>{tutela.abogado}</td>
      <td>{tutela.temaTutela}</td>
      <td>{tutela.demandanteId}</td>
      <td>{tutela.demandante}</td>
      <td>{tutela.derechoVulnerado}</td>
    </tr>
  );
}
