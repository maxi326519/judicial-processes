import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref } from "firebase/storage";
import { getBackupConfig } from "../../../redux/actions/config";
import { dateToString } from "../../../functions/dateToString";
import { dateToTime } from "../../../functions/dateToTime";
import { RootState } from "../../../interfaces/RootState";
import { useEffect } from "react";
import { storage } from "../../../firebase/config";
import swal from "sweetalert";

import styles from "./BackUps.module.css";

export function BackUps() {
  const dispatch = useDispatch();
  const backups = useSelector((state: RootState) => state.config.backup);

  useEffect(() => {
    if (!backups.lastBackUp) {
      dispatch<any>(openLoading());
      dispatch<any>(getBackupConfig())
        .then(() => {
          dispatch<any>(closeLoading());
        })
        .catch((error: Error) => {
          console.log(error);
          swal("Error", "Error al cargar la configuracion del backup", "error");
          dispatch<any>(closeLoading());
        });
    }
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (backups.data.length > 0) {
      try {
        // Get date
        const mostRecentDate = getMostRecentDate(
          backups.data.map((date) => date.split(".")[0])
        );

        // Get storage reference
        const storageRef = ref(storage, `backups/${mostRecentDate}.json`);

        // Download file
        dispatch(openLoading());
        const url = await getDownloadURL(storageRef);
        const response = await fetch(url);
        const blob = await response.blob();
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = `${mostRecentDate}.json`;
        a.click();
        dispatch(closeLoading());
      } catch (error) {
        console.error("Error downloading the backup:", error);
        dispatch(closeLoading());
      }
    }
  }

  const getMostRecentDate = (dates: string[]): string => {
    return dates.sort(
      (a, b) =>
        new Date(b.split("/").reverse().join("-")).getTime() -
        new Date(a.split("/").reverse().join("-")).getTime()
    )[0];
  };

  return (
    <div className={styles.background}>
      <span>
        Ultimo Backup: {dateToString(backups.lastBackUp)} -{" "}
        {dateToTime(backups.lastBackUp)}
      </span>
      <span>Proximo Backup: {dateToString(backups.nextBackUp)}</span>
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
