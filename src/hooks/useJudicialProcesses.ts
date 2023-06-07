import { useState, useEffect } from "react";
import {
  ErrorProcesses,
  ProcessesDetails,
  ProcessesState,
  initErrorProcesses,
  initProcessesDetails,
} from "../interfaces/JudicialProcesses";
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../interfaces/RootState";

export default function useJudicialProcesses() {
  const [judicialProcesses, setJudicialProcesses] =
    useState<ProcessesDetails>(initProcessesDetails);
  const [errors, setErrors] = useState<ErrorProcesses>(initErrorProcesses);
  const processesDetails = useSelector(
    (state: RootState) => state.processes.processesDetails
  );

  useEffect(() => {
    if (processesDetails) {
      setJudicialProcesses(processesDetails);
    }
  }, [processesDetails, setJudicialProcesses]);

  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    if (event.target.type === "date") {
      setJudicialProcesses({
        ...judicialProcesses,
        [event.target.name]: Timestamp.fromDate(new Date(event.target.value)),
      });
    } else if (event.target.name === "tipoProceso") {
      setJudicialProcesses({
        ...judicialProcesses,
        [event.target.name]: event.target.value
      });
    } else {
      setJudicialProcesses({
        ...judicialProcesses,
        [event.target.name]: event.target.value,
      });
    }
    if (errors.hasOwnProperty(event.target.name)) {
      setErrors({ ...errors, [event.target.name]: "" });
    }
  }

  function validations() {
    let error: ErrorProcesses = initErrorProcesses;
    let value = true;

    console.log(judicialProcesses);

    if (judicialProcesses.apoderadoActual === "") {
      error.apoderadoActual = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.idSiproj === 0) {
      error.idSiproj = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.radRamaJudicialInicial === "") {
      error.radRamaJudicialInicial = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.radRamaJudicialActual === "") {
      error.radRamaJudicialActual = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.tipoProceso === "") {
      error.tipoProceso = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.fechaNotificacion === null) {
      error.fechaNotificacion = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.calidadActuacionEntidad === "") {
      error.calidadActuacionEntidad = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.demandados === "") {
      error.demandados = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.idDemanante === 0) {
      error.idDemanante = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.demandante === "") {
      error.demandante = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.despachoInicial === "") {
      error.despachoInicial = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.despachoActual === "") {
      error.despachoActual = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.temaGeneral === "") {
      error.temaGeneral = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.pretensionAsunto === "") {
      error.pretensionAsunto = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.cuantiaEstimada === 0) {
      error.cuantiaEstimada = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.instanciaProceso === "") {
      error.instanciaProceso = "Debes completar este campo";
      value = false;
    }
    if (judicialProcesses.etapaProcesal === "") {
      error.etapaProcesal = "Debes completar este campo";
      value = false;
    }
    if (
      judicialProcesses.estado === ProcessesState.Activo ||
      judicialProcesses.estado === ProcessesState.Terminado
    ) {
      error.estado = "Debes completar este campo";
      value = false;
    }

    console.log(error);
    setErrors(error);
    return value;
  }

  return {
    judicialProcesses,
    errors,
    validations,
    setJudicialProcesses: handleChange,
  };
}
