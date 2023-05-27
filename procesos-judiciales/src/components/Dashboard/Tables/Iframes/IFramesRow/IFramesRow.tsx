                       import { IFrames } from "../../../../../interfaces/iframes";

import style from "./IFramesRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";
import viewSvg from "../../../../../assets/svg/view.svg";

interface Props {
  iframe: IFrames;
  handleEdit: (iframe: IFrames) => void;
  handleView: (iframe: IFrames) => void;
}

export default function IFramesRow({ iframe, handleEdit, handleView }: Props) {
  return (
    <tr className={style.row}>
      <td>{iframe.name}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(iframe)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleView(iframe)}
      >
        <img src={viewSvg} alt="edit" />
      </button>
    </tr>
  );
}
