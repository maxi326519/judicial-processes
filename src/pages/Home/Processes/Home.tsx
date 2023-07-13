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
  const [filter, setFilter] = useState({
    posicionSDP: "",
    tipoProceso: ""
  });
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

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value
    });
  }

  function handleNext() {
    redirect("/dashboard/home/tutelas");
  }

  return (
    <div className={styles.background}>
      <Navbar title="Home - Procesos" />
      <SideBar />
      {processCharts && (
        <div
          className={`${styles.charts} ${user.rol === UserRol.Admin ? styles.admin : ""
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
              <SelectInput
                name="posicionSDP"
                label="Posición SDP"
                value={filter.posicionSDP}
                list={[]}
                handleChange={handleChange}
              />
              <SelectInput
                name="tipoProceso"
                label="Tipo de proceso"
                value={filter.tipoProceso}
                list={[]}
                handleChange={handleChange}
              />
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
      )}
    </div>
  );
}
