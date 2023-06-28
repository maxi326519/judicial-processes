import { ProcessHeads } from "../../../../../interfaces/Processes/data";

import style from "./ExcelRow.module.css";

interface Props {
  processes: ProcessHeads;
}

export default function ExcelRow({ processes }: Props) {
  return (
    <tr className={style.row}>
      <td>{processes.idSiproj}</td>
      <td>{processes.radRamaJudicialInicial}</td>
      <td>{processes.radRamaJudicialInicial}</td>
      <td>{processes.demandante}</td>
    </tr>
  );
}
