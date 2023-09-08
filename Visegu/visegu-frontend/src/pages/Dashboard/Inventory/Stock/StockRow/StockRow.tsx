import { useState, useEffect } from "react";
import { Stock } from "../../../../../interfaces/Stock";

import style from "./StockRow.module.css";
import calendarSvg from "../../../../../assets/svg/calendar.svg";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import img from "../../../../.././assets/img/img.png";

interface Props {
  stock: Stock;
  handleEdit: (stock: Stock) => void;
  handleView: (stockId: string) => void;
  handleDelete: (stock: Stock) => void;
}

export default function StockRow({
  stock,
  handleEdit,
  handleView,
  handleDelete,
}: Props) {
  const [error, setError] = useState(false);

  /*   useEffect(() => {
      if (!stock.registerType) {
        setError(true);
      } else {
        setError(false);
      }
    }, [stock]); */

  return (
    <tr className={`${style.row} ${error ? style.error : ""}`}>
      <span>SKU</span>
      <span>item</span>
      <span>Categorie</span>
      <span>{stock.quantity}</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(stock)}
      >
        View
{/*         <img src={editSvg} alt="edit" /> */}
      </button>
    </tr>
  );
}
