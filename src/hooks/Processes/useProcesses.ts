import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { UserRol } from "../../interfaces/users";
import getLimitDate from "../../functions/getLimitDate";
import {
  ProcessDetails,
  ErrorProcesses,
  initProcessDetails,
  initErrorProcesses,
  ProcessState,
} from "../../interfaces/Processes/data";

export default function useJudicialProcesses() {
  const user = useSelector((state: RootState) => state.sesion);
  const config = useSelector((state: RootState) => state.config.processes);
  const [judicialProcesses, setJudicialProcesses] =
    useState<ProcessDetails>(initProcessDetails);
  const [errors, setErrors] = useState<ErrorProcesses>(initErrorProcesses);
  const processDetails = useSelector(
    (state: RootState) => state.processes.details
  );
  const lists = useSelector((state: RootState) => state.processes.lists);

  useEffect(() => {
    let data = { ...judicialProcesses };
    if (user.rol === UserRol.User) data.apoderadoActual = user.name;
    if (processDetails) {
      data = processDetails;
    }
    setJudicialProcesses(data);
  }, [user, processDetails]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    let newJudicialProcesses: ProcessDetails = { ...judicialProcesses };
    // Set upper case, delete spaces and line breaks
    const value = event.target.value
      .toUpperCase()
      .replace(/[\r\n]+/g, " ")
      .replace(/\s{2,}/g, " ");
    const name = event.target.name;
    const type = event.target.type;
    const error: any = {};

    if (type === "date") {
      const dateValue = new Date(value);
      // Only sabe if is valid date
      if (!isNaN(dateValue.getTime())) {
        newJudicialProcesses = {
          ...judicialProcesses,
          [name]: dateValue,
        };
      }
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
        new Date(value),
        lists.diasFestivos,
        days
      );
    }

    if (
      name === "fechaContestacion" &&
      newJudicialProcesses.fechaLimiteProbContestacion !== null
    ) {
      if (new Date(value) <= newJudicialProcesses.fechaLimiteProbContestacion) {
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
      newJudicialProcesses.validacionContestacion =
        "NO SE HA DILIGENCIADO FECHA DE CONTESTACION";
    }

    // Clean errors
    if (errors.hasOwnProperty(name)) {
      setErrors({ ...errors, [name]: "" });
    }

    setJudicialProcesses(newJudicialProcesses);
  }

  function reset() {
    setJudicialProcesses(initProcessDetails);
    setErrors(initErrorProcesses);
  }

  function validations() {
    let error: ErrorProcesses = { ...initErrorProcesses };
    let value = true;

    if (config.apoderadoActual && judicialProcesses.apoderadoActual === "") {
      error.apoderadoActual = "Debes completar este campo";
      value = false;
    }
    if (
      config.apoderadoAnterior &&
      judicialProcesses.apoderadoAnterior === ""
    ) {
      error.apoderadoAnterior = "Debes completar este campo";
      value = false;
    }
    if (config.idSiproj && judicialProcesses.idSiproj === 0) {
      error.idSiproj = "Debes completar este campo";
      value = false;
    }
    if (
      config.procesoAltoImpacto &&
      judicialProcesses.procesoAltoImpacto === ""
    ) {
      error.procesoAltoImpacto = "Debes completar este campo";
      value = false;
    }
    if (
      config.radRamaJudicialInicial &&
      judicialProcesses.radRamaJudicialInicial === ""
    ) {
      error.radRamaJudicialInicial = "Debes completar este campo";
      value = false;
    }
    if (
      config.radRamaJudicialActual &&
      judicialProcesses.radRamaJudicialActual === ""
    ) {
      error.radRamaJudicialActual = "Debes completar este campo";
      value = false;
    }
    if (config.tipoProceso && judicialProcesses.tipoProceso === "") {
      error.tipoProceso = "Debes completar este campo";
      value = false;
    }
    if (
      config.diasTerminoContestacion &&
      judicialProcesses.diasTerminoContestacion === null
    ) {
      error.diasTerminoContestacion = "Debes completar este campo";
      value = false;
    }
    if (
      config.fechaNotificacion &&
      judicialProcesses.fechaNotificacion === null
    ) {
      error.fechaNotificacion = "Debes completar este campo";
      value = false;
    }
    if (config.fechaAdmision && judicialProcesses.fechaAdmision === null) {
      error.fechaAdmision = "Debes completar este campo";
      value = false;
    }
    if (
      config.fechaContestacion &&
      judicialProcesses.fechaContestacion === null
    ) {
      error.fechaContestacion = "Debes completar este campo";
      value = false;
    }
    if (
      config.fechaLimiteProbContestacion &&
      judicialProcesses.fechaLimiteProbContestacion === null
    ) {
      error.fechaLimiteProbContestacion = "Debes completar este campo";
      value = false;
    }
    if (
      config.validacionContestacion &&
      judicialProcesses.validacionContestacion === ""
    ) {
      error.validacionContestacion = "Debes completar este campo";
      value = false;
    }
    if (
      config.calidadActuacionEntidad &&
      judicialProcesses.calidadActuacionEntidad === ""
    ) {
      error.calidadActuacionEntidad = "Debes completar este campo";
      value = false;
    }
    if (config.demandados && judicialProcesses.demandados === "") {
      error.demandados = "Debes completar este campo";
      value = false;
    }
    if (config.idDemanante && judicialProcesses.idDemanante === 0) {
      error.idDemanante = "Debes completar este campo";
      value = false;
    }
    if (config.demandante && judicialProcesses.demandante === "") {
      error.demandante = "Debes completar este campo";
      value = false;
    }
    if (config.despachoInicial && judicialProcesses.despachoInicial === "") {
      error.despachoInicial = "Debes completar este campo";
      value = false;
    }
    if (config.despachoActual && judicialProcesses.despachoActual === "") {
      error.despachoActual = "Debes completar este campo";
      value = false;
    }
    if (config.posicionSDP && judicialProcesses.posicionSDP === "") {
      error.posicionSDP = "Debes completar este campo";
      value = false;
    }
    if (config.temaGeneral && judicialProcesses.temaGeneral === "") {
      error.temaGeneral = "Debes completar este campo";
      value = false;
    }
    if (config.pretensionAsunto && judicialProcesses.pretensionAsunto === "") {
      error.pretensionAsunto = "Debes completar este campo";
      value = false;
    }
    if (config.cuantiaEstimada && judicialProcesses.cuantiaEstimada === 0) {
      error.cuantiaEstimada = "Debes completar este campo";
      value = false;
    }
    if (
      config.valorPretensionesSMLVM &&
      judicialProcesses.valorPretensionesSMLVM === 0
    ) {
      error.valorPretensionesSMLVM = "Debes completar este campo";
      value = false;
    }
    if (config.instanciaProceso && judicialProcesses.instanciaProceso === "") {
      error.instanciaProceso = "Debes completar este campo";
      value = false;
    }
    if (config.fechaProceso && judicialProcesses.fechaProceso === null) {
      error.fechaProceso = "Debes completar este campo";
      value = false;
    }
    if (
      config.ultimoEstadoProceso &&
      judicialProcesses.ultimoEstadoProceso === ""
    ) {
      error.ultimoEstadoProceso = "Debes completar este campo";
      value = false;
    }
    if (config.etapaProcesal && judicialProcesses.etapaProcesal === "") {
      error.etapaProcesal = "Debes completar este campo";
      value = false;
    }
    if (
      config.fechaFalloPrimeraInstancia &&
      judicialProcesses.fechaFalloPrimeraInstancia === null
    ) {
      error.fechaFalloPrimeraInstancia = "Debes completar este campo";
      value = false;
    }
    if (
      config.sentidoFalloPrimeraInstancia &&
      judicialProcesses.sentidoFalloPrimeraInstancia === ""
    ) {
      error.sentidoFalloPrimeraInstancia = "Debes completar este campo";
      value = false;
    }
    if (
      config.resumenPrimeraInstancia &&
      judicialProcesses.resumenPrimeraInstancia === ""
    ) {
      error.resumenPrimeraInstancia = "Debes completar este campo";
      value = false;
    }
    if (
      config.fechaPresentacionRecurso &&
      judicialProcesses.fechaPresentacionRecurso === null
    ) {
      error.fechaPresentacionRecurso = "Debes completar este campo";
      value = false;
    }
    if (
      config.fechaFalloSegundaInstancia &&
      judicialProcesses.fechaFalloSegundaInstancia === null
    ) {
      error.fechaFalloSegundaInstancia = "Debes completar este campo";
      value = false;
    }
    if (
      config.sentidoFalloSegundaInstancia &&
      judicialProcesses.sentidoFalloSegundaInstancia === ""
    ) {
      error.sentidoFalloSegundaInstancia = "Debes completar este campo";
      value = false;
    }
    if (
      config.resumenSegundaInstancia &&
      judicialProcesses.resumenSegundaInstancia === ""
    ) {
      error.resumenSegundaInstancia = "Debes completar este campo";
      value = false;
    }
    if (config.incidente && judicialProcesses.incidente === "") {
      error.incidente = "Debes completar este campo";
      value = false;
    }
    if (config.estadoIncidente && judicialProcesses.estadoIncidente === "") {
      error.estadoIncidente = "Debes completar este campo";
      value = false;
    }
    if (config.resumenIncidente && judicialProcesses.resumenIncidente === "") {
      error.resumenIncidente = "Debes completar este campo";
      value = false;
    }
    if (config.observaciones && judicialProcesses.observaciones === "") {
      error.observaciones = "Debes completar este campo";
      value = false;
    }
    if (
      config.calificacionContingente &&
      judicialProcesses.calificacionContingente === ""
    ) {
      error.calificacionContingente = "Debes completar este campo";
      value = false;
    }
    if (
      config.estado &&
      judicialProcesses.estado !== ProcessState.Activo &&
      judicialProcesses.estado !== ProcessState.Terminado
    ) {
      error.estado = "Debes completar este campo";
      value = false;
    }

    if (
      config.estado &&
      judicialProcesses.estado === ProcessState.Terminado &&
      judicialProcesses.fechaTerminacion === null
    ) {
      error.fechaTerminacion = "Debes completar este campo";
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
    setErrors,
  };
}
