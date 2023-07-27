import { RequirementsHeads } from "../../../../../interfaces/Requirements/data";

import style from "./ExcelRow.module.css";

interface Props {
  requirement: RequirementsHeads;
}

export default function ExcelRow({ requirement }: Props) {
  return (
    <tr className={style.row}>
      <td>{requirement.radicadoSipa}</td>
      <td>{requirement.remitenteEspecifico}</td>
      <td>{requirement.remitenteGeneral}</td>
      <td>{requirement.tipoProceso}</td>
    </tr>
  );
}
