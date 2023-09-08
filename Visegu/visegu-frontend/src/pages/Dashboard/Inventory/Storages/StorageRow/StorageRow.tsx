import { useState, useEffect } from "react";
import { Storage } from "../../../../../interfaces/Storage";

import style from "./StorageRow.module.css";
import calendarSvg from "../../../../../assets/svg/calendar.svg";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import img from "../../../../.././assets/img/img.png";

interface Props {
  storage: Storage;
  handleEdit: (storage: Storage) => void;
  handleView: (storageId: string) => void;
  handleDelete: (storage: Storage) => void;
}

export default function StorageRow({
  storage,
  handleEdit,
  handleView,
  handleDelete,
}: Props) {
  const [error, setError] = useState(false);

  /*   useEffect(() => {
      if (!storage.registerType) {
        setError(true);
      } else {
        setError(false);
      }
    }, [storage]); */

  return (
    <tr className={`${style.row} ${error ? style.error : ""}`}>
      <span>{storage.name}</span>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(storage)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </tr>
  );
}
