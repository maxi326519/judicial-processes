import { openLoading } from "../../../redux/actions/loading";
import { useDispatch } from "react-redux";

import styles from "./BackUps.module.css";

export function BackUps() {
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(openLoading());
    // Download file
  }

  return (
    <div className={styles.background}>
      <span>Ultimo Backup: 03/05/2024 22:13</span>
      <span>Proximo Backup: 10/05/2024</span>
      <button
        className="btn btn-outline-success"
        type="button"
        onClick={handleSubmit}
      >
        Descargar ultimo backup
      </button>
    </div>
  );
}
