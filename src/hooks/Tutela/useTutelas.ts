import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { UserRol } from "../../interfaces/users";
import { dateToTime } from "../../functions/dateToTime";
import {
  TutelaDetails,
  ErrorTutelaDetails,
  initTutelaDetails,
  initErrorTutelaDetails,
} from "../../interfaces/Tutelas/data";
import getLimitDate from "../../functions/getLimitDate";
import getDateLimitTutelas from "../../functions/getDateLimitTutelas";
import dateUTCToLocalDateYYYYMMDD from "../../functions/dateToStringInput";

export default function useTutelas() {
  const user = useSelector((state: RootState) => state.sesion);
  const list = useSelector((state: RootState) => state.processes.lists);
  const config = useSelector((state: RootState) => state.config.tutelas)
  const [tutela, setTutela] = useState<TutelaDetails>(initTutelaDetails);
  const [errors, setErrors] = useState<ErrorTutelaDetails>(
    initErrorTutelaDetails
  );
  const tutelaDetails = useSelector(
    (state: RootState) => state.tutelas.details
  );
  const lists = useSelector((state: RootState) => state.processes.lists);

  useEffect(() => {
    let data = { ...tutela };
    if (user.rol === UserRol.User) data.abogado = user.name;
    if (tutelaDetails) {
      data = tutelaDetails;
    }
    setTutela(data);
  }, [user, tutelaDetails]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    let newTutela: TutelaDetails = { ...tutela };
    const value = event.target.value.toUpperCase();
    const name = event.target.name;
    const type = event.target.type;
    const error: any = {};

    if (type === "date") {
      const dateValue = new Date(`${value} 08:00:00`);
      // Only sabe if is valid date
      if (!isNaN(dateValue.getTime())) {
        newTutela = {
          ...tutela,
          [name]: dateValue,
        };
      }
    } else if (event.target.type === "checkbox") {
      newTutela = {
        ...tutela,
        [name]: !newTutela.extranjero,
      };
    } else if (event.target.type === "time") {
      const timeArray = event.target.value.split(":");
      (
        newTutela[event.target.name as keyof typeof newTutela] as Date
      )?.setHours(Number(timeArray[0]));
      (
        newTutela[event.target.name as keyof typeof newTutela] as Date
      )?.setMinutes(Number(timeArray[1]));
    } else {
      newTutela = {
        ...tutela,
        [name]: value,
      };
    }

    // FUNCTIONS

    // FECHA DE VENCIMIENTO
    if (
      (name === "fecha" || name === "termino") &&
      newTutela.fecha !== null &&
      newTutela.termino !== ""
    ) {
      newTutela.fechaVencimiento = getDateLimitTutelas(
        newTutela.fecha,
        newTutela.termino,
        list.diasFestivos,
        8,
        17
      );
    }

    // VALIDACION RESPUESTA
    if (
      name === "fecha" ||
      name === "hora" ||
      name === "fechaVencimiento" ||
      name === "fechaVencimiento" ||
      name === "termino" ||
      name === "fechaRespuesta"
    ) {
      if (
        newTutela.fechaVencimiento !== null &&
        newTutela.fechaRespuesta !== null &&
        newTutela.termino !== ""
      ) {
        if (newTutela.fechaVencimiento >= newTutela.fechaRespuesta) {
          newTutela.validacionRespuesta = "A TIEMPO";
        } else {
          newTutela.validacionRespuesta = "VENCIDO";
        }
      } else {
        newTutela.validacionRespuesta = "NO SE DILIGENCIO";
      }
    }

    // TERMINO DE CUMPLIMIENTO PRIMERA INSTANCIA
    if (
      (name === "fechaFallo1raInst" ||
        name === "fallo1raInst" ||
        name === "terminoCumplimiento1raInst") &&
      newTutela.fallo1raInst === "DESFAVORABLE" &&
      newTutela.fechaFallo1raInst &&
      newTutela.terminoCumplimiento1raInst
    ) {
      newTutela.fechaCumplimiento1raInst = getLimitDate(
        newTutela.fechaFallo1raInst,
        [],
        newTutela.terminoCumplimiento1raInst
      );
    }

    if (
      newTutela.fallo1raInst !== "DESFAVORABLE" ||
      !newTutela.fechaFallo1raInst ||
      !newTutela.terminoCumplimiento1raInst
    ) {
      newTutela.fechaCumplimiento1raInst = null;
    }

    // TERMINO DE CUMPLIMIENTO SEGUNDA INSTANCIA
    if (
      (name === "fechaFallo2daInst" ||
        name === "fallo2daInst" ||
        name === "terminoCumplimiento2daInst") &&
      newTutela.fallo2daInst === "DESFAVORABLE" &&
      newTutela.fechaFallo2daInst &&
      newTutela.terminoCumplimiento2daInst
    ) {
      newTutela.fechaCumplimiento2daInst = getLimitDate(
        newTutela.fechaFallo2daInst,
        [],
        newTutela.terminoCumplimiento2daInst
      );
    }

    if (
      newTutela.fallo2daInst !== "DESFAVORABLE" ||
      !newTutela.fechaFallo2daInst ||
      !newTutela.terminoCumplimiento2daInst
    ) {
      newTutela.fechaCumplimiento2daInst = null;
    }

    // Clean errors
    if (errors.hasOwnProperty(name)) {
      setErrors({ ...errors, [name]: "" });
    }

    setTutela(newTutela);
  }

  function reset() {
    setTutela(initTutelaDetails);
    setErrors(initErrorTutelaDetails);
  }

  function validations() {
    let error: ErrorTutelaDetails = { ...initErrorTutelaDetails };
    let value = true;

    if (config.idSiproj  && config.idSiproj && tutela.idSiproj === 0) {
      error.idSiproj = "Debes completar este campo";
      value = false;
    }

    if (config.nroTutela && tutela.nroTutela  === "") {
      error.nroTutela = "Debes completar este campo";
      value = false;
    }

    if (config.abogado && tutela.abogado === "") {
      error.abogado = "Debes completar este campo";
      value = false;
    }

    if (config.tipo && tutela.tipo === "") {
      error.tipo = "Debes completar este campo";
      value = false;
    }

    if (config.fecha && tutela.fecha === null) {
      error.fecha = "Debes completar este campo";
      value = false;
    }

    if (config.radicado && tutela.radicado === "") {
      error.radicado = "Debes completar este campo";
      value = false;
    }

    if (config.demandanteId && tutela.demandanteId === "") {
      error.demandanteId = "Debes completar este campo";
      value = false;
    }

    if (config.demandante && tutela.demandante === "") {
      error.demandante = "Debes completar este campo";
      value = false;
    }

    if (config.demandado && tutela.demandado === "") {
      error.demandado = "Debes completar este campo";
      value = false;
    }

    if (config.temaTutela && tutela.temaTutela === "") {
      error.temaTutela = "Debes completar este campo";
      value = false;
    }

    if (config.derechoVulnerado && tutela.derechoVulnerado === "") {
      error.derechoVulnerado = "Debes completar este campo";
      value = false;
    }

    if (config.concepto && tutela.concepto === "") {
      error.concepto = "Debes completar este campo";
      value = false;
    }

    if (config.termino && tutela.termino === "") {
      error.termino = "Debes completar este campo";
      value = false;
    }

    if (config.remite && tutela.remite === "") {
      error.remite = "Debes completar este campo";
      value = false;
    }

        if (config.abogado && tutela.abogado === "") {
      error.abogado = "Debes completar este campo";
      value = false;
    }

    if (config.fechaRespuesta && tutela.fechaRespuesta === null) {
      error.fechaRespuesta = "Debes completar este campo";
      value = false;
    }

    if (config.radicadoSalida && tutela.radicadoSalida === "") {
      error.radicadoSalida = "Debes completar este campo";
      value = false;
    } 
    
    if (config.oficioAdicional && tutela.oficioAdicional === "") {
      error.oficioAdicional = "Debes completar este campo";
      value = false;
    }

    if (config.fallo1raInst && tutela.fallo1raInst === "") {
      error.fallo1raInst = "Debes completar este campo";
      value = false;
    }

    if (config.fechaFallo1raInst && tutela.fechaFallo1raInst === null) {
      error.fechaFallo1raInst = "Debes completar este campo";
      value = false;
    }

    if (config.observacionFallo1raInst && tutela.observacionFallo1raInst === "") {
      error.observacionFallo1raInst = "Debes completar este campo";
      value = false;
    }

    if (config.terminoCumplimiento1raInst && tutela.terminoCumplimiento1raInst === 0) {
      error.terminoCumplimiento1raInst = "Debes completar este campo";
      value = false;
    }

    if (config.cumplimiento1raInst && tutela.cumplimiento1raInst === "") {
      error.cumplimiento1raInst = "Debes completar este campo";
      value = false;
    }

    if (config.impugnacionSDP && tutela.impugnacionSDP === 0) {
      error.impugnacionSDP = "Debes completar este campo";
      value = false;
    }

    if (config.fechaImpugnacion && tutela.fechaImpugnacion === null) {
      error.fechaImpugnacion = "Debes completar este campo";
      value = false;
    }

    if (config.fallo2daInst && tutela.fallo2daInst === "") {
      error.fallo2daInst = "Debes completar este campo";
      value = false;
    }

    if (config.fechaFallo2daInst && tutela.fechaFallo2daInst === null) {
      error.fechaFallo2daInst = "Debes completar este campo";
      value = false;
    }

    if (config.observacionFallo2daInst && tutela.observacionFallo2daInst === "") {
      error.observacionFallo2daInst = "Debes completar este campo";
      value = false;
    }

    if (config.terminoCumplimiento2daInst && tutela.terminoCumplimiento2daInst === 0) {
      error.terminoCumplimiento2daInst = "Debes completar este campo";
      value = false;
    }

    if (config.cumplimiento2daInst && tutela.cumplimiento2daInst === "") {
      error.cumplimiento2daInst = "Debes completar este campo";
      value = false;
    }

    if (config.incidenteDesacato && tutela.incidenteDesacato === "") {
      error.incidenteDesacato = "Debes completar este campo";
      value = false;
    }

    if (config.observacionesGenerales && tutela.observacionesGenerales === "") {
      error.observacionesGenerales = "Debes completar este campo";
      value = false;
    }

    setErrors(error);
    return value;
  }

  return {
    tutela,
    errors,
    validations,
    reset,
    setTutela: handleChange,
    setErrors,
  };
}
