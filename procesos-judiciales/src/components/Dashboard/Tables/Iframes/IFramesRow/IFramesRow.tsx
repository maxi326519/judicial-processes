import style from "./IFramesRow.module.css";
import editSvg from "../../../../../assets/svg/edit.svg";

interface Props {
  iframe: string;
  handleView: (id: string) => void;
}

export default function IFramesRow({ iframe, handleView }: Props) {
  return (
    <tr className={style.row}>
      <td>{iframe}</td>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleView(iframe)}
      >
        <img src={editSvg} alt="edit" />
      </button>
    </tr>
  );
}
