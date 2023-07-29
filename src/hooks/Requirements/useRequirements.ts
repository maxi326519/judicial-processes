import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { useEffect, useState } from "react";
import {
  ErrorRequirementsDetail,
  RequirementsDetail,
  initErrorRequirementsDetail,
  initRequirementsDetail,
} from "../../interfaces/Requirements/data";
export default function useRequirements() {
  const requirements = useSelector((state: RootState) => state.requirements);
  const config = useSelector((state: RootState) => state.config.requirements);
  const [requirement, setRequirement] = useState<RequirementsDetail>(
    initRequirementsDetail()
  );
  const [errors, setErrors] = useState<ErrorRequirementsDetail>(
    initErrorRequirementsDetail()
  );

  // Check if requirements Details exist
  useEffect(() => {
    if (requirements.details) setRequirement(requirements.details);
  }, [requirements.details]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    let newRequirement: RequirementsDetail = { ...requirement }; // Create a copy of the current requirement
    const value = event.target.value
      .toUpperCase()
      .replace(/[\r\n]+/g, " ")
      .replace(/\s{2,}/g, " "); // Get the value, remove spaces and convert letters to uppercase
    const name = event.target.name; // Get the input name
    const type = event.target.type; // Get the input type

    console.log(name, value);

    // Check if input type is 'date' and convert data from type 'string' to type 'Date'
    if (type === "date") {
      // If value is empty set null
      if (value === "") {
        newRequirement = {
          ...newRequirement,
          [name]: null,
        };
      } else {
        const dateValue = new Date(`${value} 08:00:00`);
        // Only sabe if is valid date
        if (!isNaN(dateValue.getTime())) {
          newRequirement = {
            ...newRequirement,
            [name]: dateValue,
          };
        }
      }
    } else if (type === "number") {
      newRequirement = {
        ...newRequirement,
        [name]: Number(value),
      };
    } else {
      newRequirement = {
        ...newRequirement,
        [name]: value,
      };
    }

    // Clean errors
    if (errors.hasOwnProperty(name)) {
      setErrors({ ...errors, [name]: "" });
    }

    setRequirement(newRequirement);
  }

  function validations() {
    let error: ErrorRequirementsDetail = initErrorRequirementsDetail();
    let value = true;

    if (config.consecutivo && requirement.consecutivo === 0) {
      error.consecutivo = "Debes completar este campo";
      value = false;
    }

    if (config.fechaNotificacion && requirement.fechaNotificacion === null) {
      error.fechaNotificacion = "Debes completar este campo";
      value = false;
    }

    if (config.radicadoSipa && requirement.radicadoSipa === "") {
      error.radicadoSipa = "Debes completar este campo";
      value = false;
    }

    if (config.remitenteGeneral && requirement.remitenteGeneral === "") {
      error.remitenteGeneral = "Debes completar este campo";
      value = false;
    }

    if (config.remitenteEspecifico && requirement.remitenteEspecifico === "") {
      error.remitenteEspecifico = "Debes completar este campo";
      value = false;
    }

    if (config.direccion && requirement.direccion === "") {
      error.direccion = "Debes completar este campo";
      value = false;
    }

    if (config.concepto && requirement.concepto === "") {
      error.concepto = "Debes completar este campo";
      value = false;
    }

    if (config.tipoProceso && requirement.tipoProceso === "") {
      error.tipoProceso = "Debes completar este campo";
      value = false;
    }

    if (config.numeroProceso && requirement.numeroProceso === "") {
      error.numeroProceso = "Debes completar este campo";
      value = false;
    }

    if (config.abogado && requirement.abogado === "") {
      error.abogado = "Debes completar este campo";
      value = false;
    }

    if (config.fechaVencimiento && requirement.fechaVencimiento === null) {
      error.fechaVencimiento = "Debes completar este campo";
      value = false;
    }

    if (config.solicitudDadep && requirement.solicitudDadep === "") {
      error.solicitudDadep = "Debes completar este campo";
      value = false;
    }

    if (config.areaApoyo && requirement.areaApoyo === "") {
      error.areaApoyo = "Debes completar este campo";
      value = false;
    }

    if (config.solicitudConcepto && requirement.solicitudConcepto === "") {
      error.solicitudConcepto = "Debes completar este campo";
      value = false;
    }

    if (config.respuestaSolicitud && requirement.respuestaSolicitud === "") {
      error.respuestaSolicitud = "Debes completar este campo";
      value = false;
    }

    if (config.fechaRespuesta && requirement.fechaRespuesta === null) {
      error.fechaRespuesta = "Debes completar este campo";
      value = false;
    }

    if (config.respuestaSipa && requirement.respuestaSipa === null) {
      error.respuestaSipa = "Debes completar este campo";
      value = false;
    }

    if (config.estado && requirement.estado === "") {
      error.estado = "Debes completar este campo";
      value = false;
    }

    if (config.observaciones && requirement.observaciones === "") {
      error.observaciones = "Debes completar este campo";
      value = false;
    }

    setErrors(error);
    return value;
  }

  function reset() {
    setRequirement(initRequirementsDetail());
    setErrors(initErrorRequirementsDetail());
  }

  return {
    requirement: requirement,
    errors,
    validations,
    reset,
    setRequirement: handleChange,
    setErrors,
  };
}
