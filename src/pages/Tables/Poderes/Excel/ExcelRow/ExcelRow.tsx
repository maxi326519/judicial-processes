import { PoderesHeads } from "../../../../../interfaces/Poderes/data";

import style from "./ExcelRow.module.css";

interface Props {
  poder: PoderesHeads;
}

export default function ExcelRow({ poder }: Props) {
  return (
    <tr className={style.row}>
      <td>{poder.id}</td>
      <td>{poder.radicadoSipa}</td>
      <td>{poder.abogado}</td>
      <td>{poder.concepto}</td>
      <td>{poder.accionante}</td>
    </tr>
  );
}
