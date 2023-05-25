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
      <td>{judicialProcesses.idEkogui}</td>
      <td>{judicialProcesses.numProcesoRamaInicial}</td>
      <td>{judicialProcesses.numProcesoRamaActual}</td>
      <td>{judicialProcesses.nombreDemandante}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(judicialProcesses.idEkogui)}
      >
        <img src={editSvg} alt="edit" />
      </button>
    </tr>
  );
}
