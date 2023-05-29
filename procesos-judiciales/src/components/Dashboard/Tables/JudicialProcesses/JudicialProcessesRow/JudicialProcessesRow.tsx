import { JudicialProcesses } from "../../../../../interfaces/JudicialProcesses";

import style from "./JudicialProcessesRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";

interface Props {
  judicialProcesses: JudicialProcesses;
  handleEdit: (id: number) => void;
}

export default function JudicialProcessesRow({
  judicialProcesses,
  handleEdit,
}: Props) {
  return (
    <tr className={style.row}>
      <td>{judicialProcesses.idSiproj}</td>
      <td>{judicialProcesses.radRamaJudicialInicial}</td>
      <td>{judicialProcesses.radRamaJudicialInicial}</td>
      <td>{judicialProcesses.demandante}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(judicialProcesses.idSiproj)}
      >
        <img src={editSvg} alt="edit" />
      </button>
    </tr>
  );
}
