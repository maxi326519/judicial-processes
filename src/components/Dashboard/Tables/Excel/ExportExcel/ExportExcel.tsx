import { useState } from "react";
import {
  JudicialProcesses,
  ProcessesDetails,
  ProcessesState,
} from "../../../../../interfaces/JudicialProcesses";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import swal from "sweetalert";
import { error } from "console";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";

import Excel from "../Excel";

import styles from "./ExportExcel.module.css";
import { RootState } from "../../../../../interfaces/RootState";
import { getProcesses } from "../../../../../redux/actions/judicialProcesses";
import { db } from "../../../../../firebase";

interface Props {
  state: ProcessesState | string;
  handleClose: () => void;
}

export default function ExportExcel({ state, handleClose }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [data, setData] = useState<ProcessesDetails[]>([]);

  async function handleGetData() {
    dispatch(openLoading());
    try {
      const colProcesses = collection(db, "Details");
      let wheres = [where("apoderadoActual", "==", user.name)];
      if (state !== "") wheres.push(where("estado", "==", state));

      const detailsQuery = query(colProcesses, ...wheres);

      const snapshot = await getDocs(detailsQuery);
      const details: any = [];

      snapshot.forEach((doc) => {
        details.push(doc.data());
      });

      console.log(details);
      setData(data);

      handleClose();
    } catch (err: any) {
      console.log(err);
      swal("Error", "No se pudieron obtener los datos para exportar");
    }
  }

  return (
    <div className={styles.background}>
      <form>
        <div className={styles.close}>
          <h4>Importar procesos</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={handleGetData}
        >
          Obtener datos
        </button>
        {data.length > 0 ? <Excel data={data} state={state} /> : null}
      </form>
    </div>
  );
}
