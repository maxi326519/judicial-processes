import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProcessesData } from "../../../../redux/actions/judicialProcesses";

import EntityChart from "./EntityChart/EntityChart";
import styles from "./Home.module.css";
import ProcessesChart from "./ProcessesChart/ProcessesChart";
import StageChart from "./StageChart/StageChart";
import TypeChart from "./TypeChart/TypeChart";
import useChart from "../../../../hooks/useChart/useCharts";
import { getCharts, setCharts } from "../../../../redux/actions/charts";
import { Charts } from "../../../../interfaces/charts";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import swal from "sweetalert";

export default function Home() {
  const dispatch = useDispatch();
  const { chart, update } = useChart();

  useEffect(() => {
    dispatch<any>(getCharts());
  }, []);

  function handleUpdateCharts() {
    dispatch(openLoading());
    update.charts()
      .then(() => {
        dispatch(closeLoading());
        swal("Actualizado", "Se actualizaron los gráficos", "success");
      })
      .catch((error: any) => {
        console.log(error);
        dispatch(closeLoading());
        swal("Error", "No se pudieron actualizar los gráficos, inténtelo", "error");
      })
  }

  return (
    <div className={styles.charts}>
      <div className={styles.btnContainer}>
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleUpdateCharts}
        >
          Actualizar
        </button>
      </div>
      <ProcessesChart />
      <EntityChart />
      <StageChart />
      <TypeChart />
    </div>
  );
}
