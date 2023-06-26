import { JudicialProcesses } from "../../../../../interfaces/JudicialProcesses";

import style from "./ExcelRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";

interface Props {
  judicialProcesses: JudicialProcesses;
}

export default function ExcelRow({
  judicialProcesses,
}: Props) {
  return (
    <tr className={style.row}>
      <td>{judicialProcesses.idSiproj}</td>
      <td>{judicialProcesses.radRamaJudicialInicial}</td>
      <td>{judicialProcesses.radRamaJudicialInicial}</td>
      <td>{judicialProcesses.demandante}</td>
    </tr>
  );
}
