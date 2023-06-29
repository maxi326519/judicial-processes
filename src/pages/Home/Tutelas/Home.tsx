import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharts } from "../../../redux/actions/Processes/charts";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { RootState } from "../../../interfaces/RootState";
import { UserRol } from "../../../interfaces/users";
import useProcessCharts from "../../../hooks/Processes/useProcessesCharts";
import swal from "sweetalert";

import TutelasChart from "./TutelasChart/TutelasChart";
import Fallo1Chart from "./Fallo1Chart/Fallo1Chart";
import Fallo2Chart from "./Fallo2Chart/Fallo2Chart";
import ThemeChart from "./ThemeChart/ThemeChart";

import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const { processCharts, update } = useProcessCharts();

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
  
  function handlePrev() {
    redirect("/dashboard/home/procesos");
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
      <button className={styles.prev} type="button" onClick={handlePrev}>{`<`}</button>
      <button className={styles.next} type="button" onClick={handlePrev}>{`>`}</button>
      <TutelasChart />
      <Fallo1Chart />
      <Fallo2Chart />
      <ThemeChart />
    </div>
  );
}
