import { UserRol, Users } from "../../../../../interfaces/users";

import style from "./UsersRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

interface Props {
  user: Users;
  handleEdit: (user: Users) => void;
  handleDelete: (id: string) => void;
}

export default function UsersRow({ user, handleEdit, handleDelete }: Props) {
  return (
    <tr className={style.row}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.rol}</td>
      {user.rol === UserRol.Admin || user.permissions?.processes ? (
        <td className={`${style.permissions} ${style.access}`}>
          <span>Habilitado</span>
        </td>
      ) : (
        <td className={`${style.permissions} ${style.denegated}`}>
          <span>Denegado</span>
        </td>
      )}
      {user.rol === UserRol.Admin || user.permissions?.tutelas ? (
        <td className={`${style.permissions} ${style.access}`}>
          <span>Habilitado</span>
        </td>
      ) : (
        <td className={`${style.permissions} ${style.denegated}`}>
          <span>Denegado</span>
        </td>
      )}
      {user.rol === UserRol.Admin || user.permissions?.requirements ? (
        <td className={`${style.permissions} ${style.access}`}>
          <span>Habilitado</span>
        </td>
      ) : (
        <td className={`${style.permissions} ${style.denegated}`}>
          <span>Denegado</span>
        </td>
      )}
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(user)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(user.id!)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </tr>
  );
}
