import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCharts } from "../../../redux/actions/Tutelas/charts";
import { RootState } from "../../../interfaces/RootState";
import { UserRol } from "../../../interfaces/users";
import useTutelaChart from "../../../hooks/Tutela/useTutelaChart";
import swal from "sweetalert";

import PoderesChart from "./PoderesChart/PoderesChart";
import ThemeChart from "./ThemeChart/ThemeChart";
import Navbar from "../../../components/Navbar/Navbar";
import SideBar from "../../../components/SideBar/SideBar";

import styles from "./Home.module.css";

export default function Home() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const { charts, updateCharts } = useTutelaChart();

  useEffect(() => {
    dispatch<any>(getCharts());
  }, []);

  function handleUpdateCharts() {
    dispatch(openLoading());
    updateCharts()
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

  function handleNext() {
    redirect("/dashboard/home/requerimientos");
  }

  return (
    <div className={styles.background}>
      <Navbar title="Home- Tutelas" />
      <SideBar />
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
          onClick={handlePrev}
        >{`<`}</button>
        <button
          className={styles.next}
          type="button"
          onClick={handleNext}
        >{`>`}</button>
        <PoderesChart />
        <ThemeChart />
      </div>
    </div>
  );
}
