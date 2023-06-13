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
import getLimitDate from "../functions/getLimitDate";

export default function useJudicialProcesses() {
  const [judicialProcesses, setJudicialProcesses] =
    useState<ProcessesDetails>(initProcessesDetails);
  const [errors, setErrors] = useState<ErrorProcesses>(initErrorProcesses);
  const processesDetails = useSelector(
    (state: RootState) => state.processes.processesDetails
  );
  const lists = useSelector((state: RootState) => state.lists);

  useEffect(() => {
    if (processesDetails) {
      setJudicialProcesses(processesDetails);
    }
  }, [processesDetails, setJudicialProcesses]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    let newJudicialProcesses: ProcessesDetails = { ...judicialProcesses };
    const value = event.target.value;
    const name = event.target.name;
    const type = event.target.type;
    const error: any = {};

    if (type === "date") {
      // Convert date string to Timestamp
      newJudicialProcesses = {
        ...newJudicialProcesses,
        [name]: Timestamp.fromDate(new Date(value)),
      };
    } else {
      newJudicialProcesses = {
        ...judicialProcesses,
        [name]: value,
      };
    }

    // FUNCTIONS:
    if (name === "tipoProceso" && value !== "") {
      const days = lists.tipoProceso.find((tipo) => tipo.tipo === value)?.dias;

      newJudicialProcesses.diasTerminoContestacion = days!;

      if (newJudicialProcesses.fechaNotificacion !== null) {
        newJudicialProcesses.fechaLimiteProbContestacion = getLimitDate(
          newJudicialProcesses.fechaNotificacion,
          lists.diasFestivos,
          days!
        );
      }
    }

    if (
      name === "fechaNotificacion" &&
      value !== null &&
      newJudicialProcesses.tipoProceso !== ""
    ) {
      const days =
        lists.tipoProceso.find(
          (tipo) => tipo.tipo === newJudicialProcesses.tipoProceso
        )?.dias || 0;

      newJudicialProcesses.fechaLimiteProbContestacion = getLimitDate(
        Timestamp.fromDate(new Date(value)),
        lists.diasFestivos,
        days
      );
    }

    if (
      name === "fechaContestacion" &&
      newJudicialProcesses.fechaLimiteProbContestacion !== null
    ) {
      if (
        Timestamp.fromDate(new Date(value)) <
        newJudicialProcesses.fechaLimiteProbContestacion
      ) {
        newJudicialProcesses.validacionContestacion = "A TIEMPO";
      } else {
        newJudicialProcesses.validacionContestacion = "VENCIDO";
      }
    }

    if (name === "cuantiaEstimada") {
      const currentYear = new Date().getFullYear().toString();
      const salary = lists.salariosMinimos.find(
        (salary) => salary.fecha === currentYear
      );

      if (salary) {
        newJudicialProcesses.valorPretensionesSMLVM = Number(
          (Number(value) / salary.salario).toFixed(2)
        );
      } else {
        error.salariosMinimos = `No existe salario para ${currentYear}`;
      }
    }

    // If "tipoProceso" and "fechaNotificacion" is undefined delete "fechaLimiteProbContestacion"
    if (
      newJudicialProcesses.tipoProceso === "" ||
      newJudicialProcesses.fechaNotificacion === null
    ) {
      newJudicialProcesses.fechaLimiteProbContestacion = null;
    }

    // If "tipoProceso" and "fechaNotificacion" is undefined delete "fechaLimiteProbContestacion"
    if (
      !newJudicialProcesses.fechaLimiteProbContestacion ||
      !newJudicialProcesses.fechaContestacion
    ) {
      newJudicialProcesses.validacionContestacion = "";
    }

    // Clean errors
    if (errors.hasOwnProperty(name)) {
      setErrors({ ...errors, [name]: "", ...error });
    }

    setJudicialProcesses(newJudicialProcesses);
  }

  function reset() {
    setJudicialProcesses(initProcessesDetails);
    setErrors(initErrorProcesses);
  }

  function validations() {
    let error: ErrorProcesses = { ...initErrorProcesses };
    let value = true;

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

    setErrors(error);
    return value;
  }

  return {
    judicialProcesses,
    errors,
    validations,
    reset,
    setJudicialProcesses: handleChange,
  };
}
