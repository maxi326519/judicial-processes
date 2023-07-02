import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharts } from "../../../redux/actions/Processes/charts";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { RootState } from "../../../interfaces/RootState";
import { UserRol } from "../../../interfaces/users";
import useProcessCharts from "../../../hooks/Processes/useProcessesCharts";
import swal from "sweetalert";

import EntityChart from "./EntityChart/EntityChart";
import ProcessesChart from "./ProcessesChart/ProcessesChart";
import TypeChart from "./TypeChart/TypeChart";

import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const { processCharts, update } = useProcessCharts();

  const chartData = useSelector((state: RootState) => state.processes.charts);

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

  function handleNext() {
    redirect("/dashboard/home/tutelas");
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
      <button
        className={styles.prev}
        type="button"
        onClick={handleNext}
      >{`<`}</button>
      <button
        className={styles.next}
        type="button"
        onClick={handleNext}
      >{`>`}</button>
      <ProcessesChart />
      <EntityChart />
      <TypeChart />
    </div>
  );
}
