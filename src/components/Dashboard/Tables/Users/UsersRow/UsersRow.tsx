import { Users } from "../../../../../interfaces/users";

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
