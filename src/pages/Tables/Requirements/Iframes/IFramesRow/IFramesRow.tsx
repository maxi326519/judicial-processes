import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";
import { IFrames } from "../../../../../interfaces/iframes";

import style from "./IFramesRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";
import viewSvg from "../../../../../assets/svg/view.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";

interface Props {
  iframe: IFrames;
  handleEdit: (iframe: IFrames) => void;
  handleView: (iframe: IFrames) => void;
  handleDelete: (idIframe: string) => void;
}

export default function IFramesRow({
  iframe,
  handleEdit,
  handleView,
  handleDelete,
}: Props) {
  const user = useSelector((state: RootState) => state.sesion);

  return (
    <tr
      className={`${style.row} ${user.rol === UserRol.User ? style.user : ""}`}
    >
      <td>{iframe.name}</td>
      {user.rol === UserRol.Admin ? (
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => handleEdit(iframe)}
        >
          <img src={editSvg} alt="edit" />
        </button>
      ) : null}
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleView(iframe)}
      >
        <img src={viewSvg} alt="edit" />
      </button>
      {user.rol === UserRol.Admin ? (
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={() => handleDelete(iframe.id!)}
        >
          <img src={deleteSvg} alt="delete" />
        </button>
      ) : null}
    </tr>
  );
}
