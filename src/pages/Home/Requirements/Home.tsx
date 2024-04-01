import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharts } from "../../../redux/actions/Requirements/charts";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { RootState } from "../../../interfaces/RootState";
import { UserRol } from "../../../interfaces/users";
import { useNavigate } from "react-router-dom";
import useRequirementsChart from "../../../hooks/Requirements/useRequirementsCharts";
import swal from "sweetalert";

import Navbar from "../../../components/Navbar/Navbar";
import SideBar from "../../../components/SideBar/SideBar";
import TipoPieChart from "./TipoPieChart/TipoPieChart";
import RemitenteAreaChart from "./RemitenteAreaChart/RemitenteAreaChart";
import AbogadoBarChart from "./AbogadoBarChart/AbogadoBarChart";

import styles from "./Home.module.css";

export default function Home() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const { charts, updateCharts } = useRequirementsChart();

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
    redirect("/dashboard/home/tutelas");
  }

  function handleNext() {
    redirect("/dashboard/home/poderes");
  }

  return (
    <div className={styles.background}>
      <Navbar title="Home- Requerimientos" />
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
        <AbogadoBarChart chartData={charts.abogado} />
        <TipoPieChart chartData={charts.tipo} />
        <RemitenteAreaChart chartData={charts.remitente} />
      </div>
    </div>
  );
}
