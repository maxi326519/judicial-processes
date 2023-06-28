import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";
import { TutelaHeads } from "../../../../../interfaces/Tutelas/data";

import style from "./TutelaRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

interface Props {
  tutela: TutelaHeads;
  handleEdit: (id: string) => void;
  handleDelete: (procesess: TutelaHeads) => void;
}

export default function TutelaRow({ tutela, handleEdit, handleDelete }: Props) {
  const user = useSelector((state: RootState) => state.sesion);
  return (
    <tr
      className={`${style.row} ${user.rol === UserRol.Admin ? "" : style.user}`}
    >
      <td>{tutela.idSiproj}</td>
      <td>{tutela.nroTutela}</td>
      <td>{tutela.abogado}</td>
      <td>{tutela.demandanteId}</td>
      <td>{tutela.demandante}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(tutela.idSiproj.toString())}
      >
        <img src={editSvg} alt="edit" />
      </button>
      {user.rol === UserRol.Admin ? (
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={() => handleDelete(tutela)}
        >
          <img src={deleteSvg} alt="delete" />
        </button>
      ) : null}
    </tr>
  );
}
