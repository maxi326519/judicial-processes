import { ConciliacionesHeads } from "../../../../../interfaces/Conciliaciones/data";
import { dateToString } from "../../../../../functions/dateToString";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";

import style from "./ConciliacionesRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

interface Props {
  conciliacion: ConciliacionesHeads;
  handleEdit: (id: number) => void;
  handleDelete: (procesess: ConciliacionesHeads) => void;
}

export default function ConciliacionesRow({
  conciliacion,
  handleEdit,
  handleDelete,
}: Props) {
  const user = useSelector((state: RootState) => state.sesion);
  return (
    <tr
      className={`${style.row} ${
        user.rol === UserRol.Admin ? style.admin : ""
      }`}
    >
      <td>{conciliacion.id}</td>
      <td>{dateToString(conciliacion.fechaIngresoSolicitud)}</td>
      <td>{conciliacion.radicadoSIPA}</td>
      <td>{conciliacion.convocante}</td>
      <td>{conciliacion.asignacionAbogado}</td>
      <td>{conciliacion.estadoSolicitud}</td>
      <td>{conciliacion.medioControl}</td>
      <td>{conciliacion.desicionComite}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(conciliacion.id!)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      {user.rol === UserRol.Admin ? (
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={() => handleDelete(conciliacion)}
        >
          <img src={deleteSvg} alt="delete" />
        </button>
      ) : null}
    </tr>
  );
}
