import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import {
  Conciliaciones,
  ErrorConciliaciones,
  initConciliaciones,
  initErrorConciliaciones,
} from "../../interfaces/Conciliaciones/data";
import { getFechaTermino } from "../../functions/getFechaTermino";

export default function useConciliaciones() {
  const config = useSelector((state: RootState) => state.config.conciliaciones);
  const diasFestivos = useSelector(
    (state: RootState) => state.processes.lists.diasFestivos
  );
  const [conciliacion, setConciliacion] = useState<Conciliaciones>(
    initConciliaciones(config.id)
  );
  const [errors, setErrors] = useState<ErrorConciliaciones>(
    initErrorConciliaciones()
  );
  const conciliacionDetails = useSelector(
    (state: RootState) => state.conciliaciones.details
  );
  const conciliaciones = useSelector(
    (state: RootState) => state.conciliaciones.heads
  );

  useEffect(() => {
    if (conciliacionDetails) setConciliacion(conciliacionDetails);
  }, [conciliacionDetails]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    let newConciliaciones: Conciliaciones = { ...conciliacion };
    const value = event.target.value
      .toUpperCase()
      .replace(/[\r\n]+/g, " ")
      .replace(/\s{2,}/g, " ");
    const name = event.target.name;
    const type = event.target.type;

    if (type === "date") {
      // If value is empty set null
      if (value === "") {
        newConciliaciones = {
          ...conciliacion,
          [name]: null,
        };
      } else {
        const dateValue = new Date(`${value} 08:00:00`);
        // Only sabe if is valid date
        if (!isNaN(dateValue.getTime())) {
          newConciliaciones = {
            ...conciliacion,
            [name]: dateValue,
          };
        }
      }
    } else if (event.target.type === "time") {
      const timeArray = event.target.value.split(":");
      (
        newConciliaciones[
          event.target.name as keyof typeof newConciliaciones
        ] as Date
      )?.setHours(Number(timeArray[0]));
      (
        newConciliaciones[
          event.target.name as keyof typeof newConciliaciones
        ] as Date
      )?.setMinutes(Number(timeArray[1]));
    } else {
      newConciliaciones = {
        ...conciliacion,
        [name]: value,
      };
    }

    // Clean errors
    if (errors.hasOwnProperty(name)) {
      setErrors({ ...errors, [name]: "" });
    }

    // Functions
    if (newConciliaciones.fechaIngresoSolicitud) {
      newConciliaciones.terminoLegal = getFechaTermino(
        diasFestivos,
        newConciliaciones.fechaIngresoSolicitud
      );
    }

    setConciliacion(newConciliaciones);
  }

  function reset() {
    setConciliacion(initConciliaciones());
    setErrors(initErrorConciliaciones());
  }

  function validations() {
    let error: ErrorConciliaciones = initErrorConciliaciones();
    let value = true;

    if (conciliacion.id === 0) {
      error.id = "Debes completar este campo";
      value = false;
    }

    if (
      config.fechaIngresoSolicitud &&
      conciliacion.fechaIngresoSolicitud === null
    ) {
      error.fechaIngresoSolicitud = "Debes completar este campo";
      value = false;
    }

    if (config.radicadoSIPA && conciliacion.radicadoSIPA === "") {
      error.radicadoSIPA = "Debes completar este campo";
      value = false;
    }

    if (config.convocante && conciliacion.convocante === "") {
      error.convocante = "Debes completar este campo";
      value = false;
    }

    if (config.medioControl && conciliacion.medioControl === "") {
      error.medioControl = "Debes completar este campo";
      value = false;
    }

    if (config.pretension && conciliacion.pretension === "") {
      error.pretension = "Debes completar este campo";
      value = false;
    }

    if (config.valorEstimado && conciliacion.valorEstimado === "") {
      error.valorEstimado = "Debes completar este campo";
      value = false;
    }

    if (config.asignacionAbogado && conciliacion.asignacionAbogado === "") {
      error.asignacionAbogado = "Debes completar este campo";
      value = false;
    }

    if (config.estadoSolicitud && conciliacion.estadoSolicitud === "") {
      error.estadoSolicitud = "Debes completar este campo";
      value = false;
    }

    if (config.consecutivo && conciliacion.consecutivo === 0) {
      error.consecutivo = "Debes completar este campo";
      value = false;
    }

    if (
      config.radicadosSIPASolicitud &&
      conciliacion.radicadosSIPASolicitud === ""
    ) {
      error.radicadosSIPASolicitud = "Debes completar este campo";
      value = false;
    }

    if (
      config.radicadosSIPARespuesta &&
      conciliacion.radicadosSIPARespuesta === ""
    ) {
      error.radicadosSIPARespuesta = "Debes completar este campo";
      value = false;
    }

    if (config.fechaComite && conciliacion.fechaComite === null) {
      error.fechaComite = "Debes completar este campo";
      value = false;
    }

    if (config.decisionComite && conciliacion.decisionComite === "") {
      error.decisionComite = "Debes completar este campo";
      value = false;
    }

    if (config.estadoAudiencia && conciliacion.estadoAudiencia === "") {
      error.estadoAudiencia = "Debes completar este campo";
      value = false;
    }

    if (
      config.procuraduriaRemitente &&
      conciliacion.procuraduriaRemitente === ""
    ) {
      error.procuraduriaRemitente = "Debes completar este campo";
      value = false;
    }

    if (config.numeroSolicitud && conciliacion.numeroSolicitud === "") {
      error.numeroSolicitud = "Debes completar este campo";
      value = false;
    }

    if (
      config.fechaCitacionAudiencia &&
      conciliacion.fechaCitacionAudiencia === null
    ) {
      error.fechaCitacionAudiencia = "Debes completar este campo";
      value = false;
    }

    if (config.observaciones && conciliacion.observaciones === "") {
      error.observaciones = "Debes completar este campo";
      value = false;
    }

    setErrors(error);
    return value;
  }

  return {
    conciliacion,
    errors,
    validations,
    reset,
    setConciliacion: handleChange,
    setErrors,
  };
}
