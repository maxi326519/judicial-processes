import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharts } from "../../../redux/actions/Processes/charts";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { RootState } from "../../../interfaces/RootState";
import { UserRol } from "../../../interfaces/users";
import { useNavigate } from "react-router-dom";
import useProcessCharts from "../../../hooks/Processes/useProcessesCharts";
import swal from "sweetalert";

import EntityChart from "./EntityChart/EntityChart";
import ProcessesChart from "./ProcessesChart/ProcessesChart";
import TypeChart from "./TypeChart/TypeChart";

import Navbar from "../../../components/Navbar/Navbar";
import SideBar from "../../../components/SideBar/SideBar";
import SelectInput from "../../../components/Inputs/SelectInput";

import styles from "./Home.module.css";

export default function Home() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const charts = useSelector((state: RootState) => state.processes.charts);
  const [posicionSDP, setPosicionSDP] = useState("");
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

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPosicionSDP(event.target.value);
  }

  function handleNext() {
    redirect("/dashboard/home/tutelas");
  }

  function handlePrev() {
    redirect("/dashboard/home/requerimientos");
  }

  return (
    <div className={styles.background}>
      <Navbar title="Home - Procesos" />
      <SideBar />
      {processCharts && (
        <div className={styles.charts}>
          <div className={styles.btnContainer}>
            {user.rol === UserRol.Admin ? (
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleUpdateCharts}
              >
                Actualizar
              </button>
            ) : null}
            <SelectInput
              name="posicionSDP"
              label="Posición SDP"
              value={posicionSDP}
              list={charts.entityChart.map((data) => data.posicion)}
              handleChange={handleChange}
            />
          </div>
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
          <ProcessesChart posicionSDP={posicionSDP} />
          <EntityChart posicionSDP={posicionSDP} />
          <TypeChart posicionSDP={posicionSDP} />
        </div>
      )}
    </div>
  );
}
