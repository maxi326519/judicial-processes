import { JudicialProcesses } from "../../../../../interfaces/JudicialProcesses";

import style from "./JudicialProcessesRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

interface Props {
  judicialProcesses: JudicialProcesses;
  handleEdit: (id: string) => void;
  handleDelete: (procesess: JudicialProcesses) => void;
}

export default function JudicialProcessesRow({
  judicialProcesses,
  handleEdit,
  handleDelete,
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
        onClick={() => handleEdit(judicialProcesses.idDetails!)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(judicialProcesses)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </tr>
  );
}
