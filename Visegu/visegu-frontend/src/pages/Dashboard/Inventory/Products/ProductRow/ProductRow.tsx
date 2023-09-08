import { useState, useEffect } from "react";
import { Product } from "../../../../../interfaces/Product";

import style from "./ProductRow.module.css";
import calendarSvg from "../../../../../assets/svg/calendar.svg";
import editSvg from "../../../../../assets/svg/edit.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import img from "../../../../.././assets/img/img.png";

interface Props {
  product: Product;
  handleEdit: (product: Product) => void;
  handleView: (productId: string) => void;
  handleDelete: (product: Product) => void;
}

export default function ProductRow({
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
      <span>{product.skunUmber}</span>
      <span>{product.descripcion}</span>
      <span>{product.CategoryId}</span>
      <span>{product.id}</span>
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
    </tr>
  );
}
