import { JudicialProcesses } from "../../../../../interfaces/JudicialProcesses";

import style from "./JudicialProcessesRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";

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
  const user = useSelector((state: RootState) => state.user)
  return (
    <tr className={`${style.row} ${user.rol === UserRol.Admin ? "" : style.user}`}>
      <td>{judicialProcesses.idSiproj}</td>
      <td>{judicialProcesses.radRamaJudicialInicial}</td>
      <td>{judicialProcesses.radRamaJudicialActual}</td>
      <td>{judicialProcesses.demandante}</td>
      <td>{judicialProcesses.apoderadoActual}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(judicialProcesses.idSiproj.toString())}
      >
        <img src={editSvg} alt="edit" />
      </button>
      {user.rol === UserRol.Admin ? (
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={() => handleDelete(judicialProcesses)}
        >
          <img src={deleteSvg} alt="delete" />
        </button>
      ) : null}
    </tr>
  );
}
