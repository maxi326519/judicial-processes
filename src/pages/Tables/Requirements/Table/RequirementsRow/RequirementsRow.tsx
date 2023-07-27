import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";
import { RequirementsHeads } from "../../../../../interfaces/Requirements/data";

import style from "./RequirementsRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

interface Props {
  requirements: RequirementsHeads;
  handleEdit: (id: string) => void;
  handleDelete: (procesess: RequirementsHeads) => void;
}

export default function RequirementsRow({
  requirements,
  handleEdit,
  handleDelete,
}: Props) {
  const user = useSelector((state: RootState) => state.sesion);
  return (
    <tr
      className={`${style.row} ${user.rol === UserRol.Admin ? "" : style.user}`}
    >
      <td>{requirements.radicadoSipa}</td>
      <td>{requirements.tipoProceso}</td>
      <td>{requirements.remitenteGeneral}</td>
      <td>{requirements.remitenteEspecifico}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(requirements.id!)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      {user.rol === UserRol.Admin ? (
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={() => handleDelete(requirements)}
        >
          <img src={deleteSvg} alt="delete" />
        </button>
      ) : null}
    </tr>
  );
}
