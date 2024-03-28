import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { UserRol } from "../../interfaces/users";
import {
  ErrorPoderesDetails,
  initErrorPoderesDetails,
  initPoderesDetails,
  PoderesDetails,
} from "../../interfaces/Poderes/data";

export default function usePoder() {
  const user = useSelector((state: RootState) => state.sesion);
  const [poder, setPoder] = useState<PoderesDetails>(initPoderesDetails());
  const [errors, setErrors] = useState<ErrorPoderesDetails>(
    initErrorPoderesDetails()
  );
  const poderDetails = useSelector((state: RootState) => state.poderes.details);
  const lists = useSelector((state: RootState) => state.poderes.lists);

  useEffect(() => {
    let data = { ...poder };
    if (user.rol === UserRol.User) data.abogado = user.name;
    if (poderDetails) {
      data = poderDetails;
    }
    setPoder(data);
  }, [user, poderDetails]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    let newPoder: PoderesDetails = { ...poder };
    // Set upper case, delete spaces and line breaks
    const value = event.target.value.toUpperCase().replace(/\s{2,}/g, " ");
    const name = event.target.name;
    const type = event.target.type;

    if (type === "date") {
      // If value is empty set null
      if (value === "") {
        newPoder = {
          ...poder,
          [name]: null,
        };
      } else {
        const dateValue = new Date(value);
        // Only sabe if is valid date
        if (!isNaN(dateValue.getTime())) {
          newPoder = {
            ...poder,
            [name]: dateValue,
          };
        }
      }
    } else {
      newPoder = {
        ...poder,
        [name]: value,
      };
    }

    // Clean errors
    if (errors.hasOwnProperty(name)) {
      setErrors({ ...errors, [name]: "" });
    }

    setPoder(newPoder);
  }

  function reset() {
    setPoder(initPoderesDetails());
    setErrors(initErrorPoderesDetails());
  }

  function validations() {
    let error: ErrorPoderesDetails = initErrorPoderesDetails();
    let value = true;

    // Add validations
    if (poder.fechaRadicacion === null) {
      error.fechaRadicacion = "Debes completar este campo";
      value = false;
    }

    if (poder.radicadoSipa === "") {
      error.radicadoSipa = "Debes completar este campo";
      value = false;
    }

    if (poder.abogado === "") {
      error.abogado = "Debes completar este campo";
      value = false;
    }

    if (poder.concepto === "") {
      error.concepto = "Debes completar este campo";
      value = false;
    }

    if (poder.proceso === "") {
      error.proceso = "Debes completar este campo";
      value = false;
    }

    if (poder.numero === "") {
      error.numero = "Debes completar este campo";
      value = false;
    }

    if (poder.accionante === "") {
      error.accionante = "Debes completar este campo";
      value = false;
    }

    if (poder.observaciones === "") {
      error.observaciones = "Debes completar este campo";
      value = false;
    }

    setErrors(error);
    return value;
  }

  return {
    poder,
    errors,
    validations,
    reset,
    setPoder: handleChange,
    setErrors,
  };
}
