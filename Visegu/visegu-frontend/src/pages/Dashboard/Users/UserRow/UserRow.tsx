import { useState, useEffect } from "react";

import style from "./UserRow.module.css";
import calendarSvg from "../../../../../assets/svg/calendar.svg";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import img from "../../../../.././assets/img/img.png";
import { User } from "../../../../interfaces/User";

interface Props {
  product: User;
  handleEdit: (product: User) => void;
  handleView: (productId: string) => void;
  handleDelete: (product: User) => void;
}

export default function UserRow({
  product,
  handleEdit,
  handleView,
  handleDelete,
}: Props) {
  const [error, setError] = useState(false);

  /*   useEffect(() => {
      if (!product.registerType) {
        setError(true);
      } else {
        setError(false);
      }
    }, [product]); */

  return (
    <tr className={`${style.row} ${error ? style.error : ""}`}>
      <span>{product.name}</span>
      <span>{product.email}</span>
      <span>{product.rol}</span>
      <span>status</span>
      <span>{product.id}</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(product)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(product)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(product)}
      >
        Reset
        {/*         <img src={deleteSvg} alt="delete" /> */}
      </button>
    </tr>
  );
}
