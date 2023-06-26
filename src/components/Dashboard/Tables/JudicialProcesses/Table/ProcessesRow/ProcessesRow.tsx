import { useSelector } from "react-redux";
import { RootState } from "../../../../../../interfaces/RootState";
import { ProcessHeads } from "../../../../../../interfaces/Processes/data";
import { UserRol } from "../../../../../../interfaces/users";

import style from "./ProcessesRow.module.css";
import editSvg from "../../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../../assets/svg/delete.svg";

interface Props {
  processes: ProcessHeads;
  handleEdit: (id: string) => void;
  handleDelete: (procesess: ProcessHeads) => void;
}

export default function ProcessesRow({
  processes,
  handleEdit,
  handleDelete,
}: Props) {
  const user = useSelector((state: RootState) => state.sesion);
  return (
    <tr
      className={`${style.row} ${user.rol === UserRol.Admin ? "" : style.user}`}
    >
      <td>{processes.idSiproj}</td>
      <td>{processes.radRamaJudicialInicial}</td>
      <td>{processes.radRamaJudicialActual}</td>
      <td>{processes.demandante}</td>
      <td>{processes.apoderadoActual}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(processes.idSiproj.toString())}
      >
        <img src={editSvg} alt="edit" />
      </button>
      {user.rol === UserRol.Admin ? (
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={() => handleDelete(processes)}
        >
          <img src={deleteSvg} alt="delete" />
        </button>
      ) : null}
    </tr>
  );
}
