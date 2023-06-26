import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { UserRol } from "../../interfaces/users";
import {
  TutelaDetails,
  ErrorTutelaDetails,
  initTutelaDetails,
  initErrorTutelaDetails,
} from "../../interfaces/Tutelas/data";
import getLimitDate from "../../functions/getLimitDate";

export default function useTutelas() {
  const user = useSelector((state: RootState) => state.sesion);
  const [tutela, setTutela] = useState<TutelaDetails>(initTutelaDetails);
  const [errors, setErrors] = useState<ErrorTutelaDetails>(
    initErrorTutelaDetails
  );
  const tutelaDetails = useSelector(
    (state: RootState) => state.tutelas.details
  );
  const lists = useSelector((state: RootState) => state.tutelas.lists);

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
      const dateValue = new Date(value);
      // Only sabe if is valid date
      if (!isNaN(dateValue.getTime())) {
        newTutela = {
          ...tutela,
          [name]: dateValue,
        };
      }
    } else {
      newTutela = {
        ...tutela,
        [name]: value,
      };
    }

    // FUNCTIONS

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
