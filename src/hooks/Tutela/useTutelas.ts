import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { UserRol } from "../../interfaces/users";
import { closeLoading, openLoading } from "../../redux/actions/loading";
import { updateUserDisabled } from "../../redux/actions/Tutelas/tutelas";
import {
  TutelaDetails,
  ErrorTutelaDetails,
  initTutelaDetails,
  initErrorTutelaDetails,
} from "../../interfaces/Tutelas/data";
import getLimitDate from "../../functions/getLimitDate";
import getDateLimitTutelas from "../../functions/getDateLimitTutelas";

export default function useTutelas() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const list = useSelector((state: RootState) => state.processes.lists);
  const config = useSelector((state: RootState) => state.config.tutelas);
  const usersSelected = useSelector((state: RootState) => state.tutelas.users);
  const [tutela, setTutela] = useState<TutelaDetails>(initTutelaDetails());
  const [errors, setErrors] = useState<ErrorTutelaDetails>(
    initErrorTutelaDetails()
  );
  const tutelaDetails = useSelector(
    (state: RootState) => state.tutelas.details
  );

  useEffect(() => {
    checkTutelasPerUser();
  }, []);

  useEffect(() => {
    if (tutelaDetails) setTutela(tutelaDetails);
  }, [tutelaDetails]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    let newTutela: TutelaDetails = { ...tutela };
    const value = event.target.value
      .toUpperCase()
      .replace(/[\r\n]+/g, " ")
      .replace(/\s{2,}/g, " ");
    const name = event.target.name;
    const type = event.target.type;

    if (type === "date") {
      // If value is empty set null
      if (value === "") {
        newTutela = {
          ...tutela,
          [name]: null,
        };
      } else {
        const dateValue = new Date(`${value} 08:00:00`);
        // Only sabe if is valid date
        if (!isNaN(dateValue.getTime())) {
          newTutela = {
            ...tutela,
            [name]: dateValue,
          };
        }
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

  function checkTutelasPerUser() {
    let change = false;
    let usersSelectedLocal = [...usersSelected];
    const availableUsers = users.filter((user) => {
      if (
        user.available && // If available exist
        user.available.startDate! <= new Date() && // If the date is within the range
        user.available.endDate! >= new Date()
      ) return false;
      if (!user.permissions?.tutelas) return false;
      if (user.email === "maxi.326519@gmail.com") return false;
      return true;
    });

    dispatch(openLoading());

    console.log("All users", users);
    console.log("Checking users", availableUsers);
    console.log("Selected: ", usersSelectedLocal);

    // Check if the users already exist, otherwise create it
    availableUsers.forEach((user) => {
      // If don't exist, add the user
      if (!usersSelectedLocal.some((selected) => selected.user === user.name)) {
        change = true;
        console.log("Check true 1");
        console.log(
          usersSelectedLocal.length,
          usersSelectedLocal.find((selected) => selected.user === user.name)
            ?.user,
          user.name
        );
        usersSelectedLocal.push({
          user: user.name,
          available: true,
        });
      }
    });

    console.log("Checking availables");

    // Check if some users have 'available' property in true, otherwise set all 'availabel' property in true
    if (!usersSelectedLocal.some((selected) => selected.available)) {
      change = true;
      console.log(usersSelectedLocal.some((selected) => selected.available));
      console.log("Check true 2");
      usersSelectedLocal = usersSelectedLocal.map((selected) => ({
        user: selected.user,
        available: true,
      }));
    }

    console.log("Changes: ", change);

    // If set some change, save the data
    if (change) {
      dispatch<any>(updateUserDisabled(usersSelectedLocal))
        .then(() => {
          dispatch(closeLoading());
        })
        .catch((error: Error) => {
          console.log(error.message);
          dispatch(closeLoading());
        });
    } else {
      dispatch(closeLoading());
    }

    // Set in 'abogado' property the first user availabel
    for (const selected of usersSelectedLocal) {
      if (selected.available) {
        const newTutela = { ...tutela, abogado: selected.user };
        console.log("selected: ", newTutela);
        setTutela(newTutela);
        break;
      }
    }
  }

  function reset() {
    setTutela(initTutelaDetails());
    setErrors(initErrorTutelaDetails());
  }

  function validations() {
    let error: ErrorTutelaDetails = initErrorTutelaDetails();
    let value = true;

    if (config.idSiproj && tutela.idSiproj === 0) {
      error.idSiproj = "Debes completar este campo";
      value = false;
    }

    if (config.nroTutela && tutela.nroTutela === "") {
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

    if (
      config.observacionFallo1raInst &&
      tutela.observacionFallo1raInst === ""
    ) {
      error.observacionFallo1raInst = "Debes completar este campo";
      value = false;
    }

    if (
      config.terminoCumplimiento1raInst &&
      tutela.terminoCumplimiento1raInst === 0
    ) {
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

    if (
      config.observacionFallo2daInst &&
      tutela.observacionFallo2daInst === ""
    ) {
      error.observacionFallo2daInst = "Debes completar este campo";
      value = false;
    }

    if (
      config.terminoCumplimiento2daInst &&
      tutela.terminoCumplimiento2daInst === 0
    ) {
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
