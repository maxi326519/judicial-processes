import { Users } from "../../../../../interfaces/users";

import style from "./UsersRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";

interface Props {
  user: Users;
  handleEdit: (id: string) => void;
}

export default function UsersRow({ user, handleEdit }: Props) {
  return (
    <tr className={style.row}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.rol}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(user.id!)}
      >
        <img src={editSvg} alt="edit" />
      </button>
    </tr>
  );
}
