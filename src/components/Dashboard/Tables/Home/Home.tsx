import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharts } from "../../../../redux/actions/charts";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { RootState } from "../../../../interfaces/RootState";
import { UserRol } from "../../../../interfaces/users";
import useChart from "../../../../hooks/useChart/useCharts";
import swal from "sweetalert";

import EntityChart from "./EntityChart/EntityChart";
import ProcessesChart from "./ProcessesChart/ProcessesChart";
import StageChart from "./StageChart/StageChart";
import TypeChart from "./TypeChart/TypeChart";

import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { chart, update } = useChart();

  useEffect(() => {
    dispatch<any>(getCharts());
  }, []);

  function handleUpdateCharts() {
    dispatch(openLoading());
    update
      .charts()
      .then(() => {
        dispatch(closeLoading());
        swal("Actualizado", "Se actualizaron los gráficos", "success");
      })
      .catch((error: any) => {
        console.log(error);
        dispatch(closeLoading());
        swal(
          "Error",
          "No se pudieron actualizar los gráficos, inténtelo",
          "error"
        );
      });
  }

  return (
    <div
      className={`${styles.charts} ${
        user.rol === UserRol.Admin ? styles.admin : ""
      }`}
    >
      {user.rol === UserRol.Admin ? (
        <div className={styles.btnContainer}>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleUpdateCharts}
          >
            Actualizar
          </button>
        </div>
      ) : null}
      <ProcessesChart />
      <EntityChart />
      <TypeChart />
    </div>
  );
}
