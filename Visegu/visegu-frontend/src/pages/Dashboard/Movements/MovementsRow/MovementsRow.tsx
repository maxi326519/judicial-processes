import { useState, useEffect } from "react";

import style from "./HistoryRow.module.css";
import calendarSvg from "../../../../../assets/svg/calendar.svg";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import img from "../../../../.././assets/img/img.png";
import { History } from "../../../../interfaces/History";

interface Props {
  movements: History;
  handleEdit: (movements: History) => void;
  handleView: (movementsId: string) => void;
  handleDelete: (movements: History) => void;
}

export default function HistoryRow({
  movements,
  handleEdit,
  handleView,
  handleDelete,
}: Props) {
  const [error, setError] = useState(false);

  /*   useEffect(() => {
      if (!movements.registerType) {
        setError(true);
      } else {
        setError(false);
      }
    }, [movements]); */

  return (
    <tr className={`${style.row} ${error ? style.error : ""}`}>
      <span>{movements.date}</span>
      <span>{movements.type}</span>
      <span>{movements.StockId}</span>
      <span>item</span>
      <span>quantity</span>
      <span>Storage</span>
      <span>User</span>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(movements)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </tr>
  );
}
