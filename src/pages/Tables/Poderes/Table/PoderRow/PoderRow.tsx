import { PoderesHeads } from "../../../../../interfaces/Poderes/data";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";

import style from "./PoderRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

interface Props {
  poder: PoderesHeads;
  handleEdit: (id: string) => void;
  handleDelete: (procesess: PoderesHeads) => void;
}

export default function PoderRow({ poder, handleEdit, handleDelete }: Props) {
  const user = useSelector((state: RootState) => state.sesion);
  return (
    <tr
      className={`${style.row} ${
        user.rol === UserRol.Admin ? style.admin : ""
      }`}
    >
      <td>{poder.id}</td>
      <td>{poder.radicadoSipa}</td>
      <td>{poder.abogado}</td>
      <td>{poder.concepto}</td>
      <td>{poder.accionante}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(poder.id!)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      {user.rol === UserRol.Admin ? (
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={() => handleDelete(poder)}
        >
          <img src={deleteSvg} alt="delete" />
        </button>
      ) : null}
    </tr>
  );
}
