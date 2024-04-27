import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";
import {
  setConciliaciones,
  updateConciliaciones,
} from "../../../../../redux/actions/Conciliaciones/conciliaciones";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
import dateUTCToLocalDateYYYYMMDD from "../../../../../functions/dateToStringInput";
import useConciliaciones from "../../../../../hooks/Conciliaciones/useConciliaciones";
import swal from "sweetalert";

import Input from "../../../../../components/Inputs/Input";
import SelectInput from "../../../../../components/Inputs/SelectInput";
import TextareaInput from "../../../../../components/Inputs/TextareaInput";

import styles from "./Form.module.css";

interface Props {
  handleClose: () => void;
}

export default function Form({ handleClose }: Props) {
  const dispatch = useDispatch();
  const { conciliacion, errors, validations, reset, setConciliacion } =
    useConciliaciones();
  const conciliacionDetails = useSelector(
    (state: RootState) => state.conciliaciones.details
  );
  const users = useSelector((state: RootState) => state.users);
  const lists = useSelector((state: RootState) => state.conciliaciones.lists);
  const [errorLength, setErrorLength] = useState<number>(0);

  const inputs = [
    {
      value: conciliacion.id,
      name: "id",
      label: "id",
      inputType: "string",
      error: errors.id,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(conciliacion.fechaIngresoSolicitud),
      name: "fechaIngresoSolicitud",
      label: "fechaIngresoSolicitud",
      inputType: "string",
      error: errors.fechaIngresoSolicitud,
    },
    {
      value: conciliacion.radicadoSIPA,
      name: "radicadoSIPA",
      label: "radicadoSIPA",
      inputType: "string",
      error: errors.radicadoSIPA,
    },
    {
      value: conciliacion.convocante,
      name: "convocante",
      label: "convocante",
      inputType: "string",
      error: errors.convocante,
    },
    {
      value: conciliacion.medioControl,
      name: "medioControl",
      label: "medioControl",
      inputType: "select",
      list: lists.medioControl,
      error: errors.medioControl,
    },
    {
      value: conciliacion.pretension,
      name: "pretension",
      label: "pretension",
      inputType: "select",
      list: lists.pretension,
      error: errors.pretension,
    },
    {
      value: conciliacion.asignacionAbogado,
      name: "asignacionAbogado",
      label: "asignacionAbogado",
      inputType: "select",
      listado: users
        .filter(
          (user) =>
            user.id !== "2RuL7ejyY7ftgEAL4j7jy2RyOXQ2" && // Filter one user
            (user.permissions?.conciliaciones || user.rol === UserRol.Admin) && // Filter only they have access
            !(
              user.available && // If available exist
              user.available.startDate! <= new Date() && // If the date is within the range
              user.available.endDate! >= new Date()
            )
        )
        .map((user) => user.name),
      error: errors.asignacionAbogado,
    },
    {
      value: conciliacion.estadoSolicitud,
      name: "estadoSolicitud",
      label: "estadoSolicitud",
      inputType: "string",
      error: errors.estadoSolicitud,
    },
    {
      value: conciliacion.terminoLegal,
      name: "terminoLegal",
      label: "terminoLegal",
      inputType: "string",
      error: errors.terminoLegal,
    },
    {
      value: conciliacion.consecutivo,
      name: "consecutivo",
      label: "consecutivo",
      inputType: "number",
      error: errors.consecutivo,
    },
    {
      value: conciliacion.radicadosSIPASolicitud,
      name: "radicadosSIPASolicitud",
      label: "radicadosSIPASolicitud",
      inputType: "string",
      error: errors.radicadosSIPASolicitud,
    },
    {
      value: conciliacion.radicadosSIPARespuesta,
      name: "radicadosSIPARespuesta",
      label: "radicadosSIPARespuesta",
      inputType: "string",
      error: errors.radicadosSIPARespuesta,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(conciliacion.fechaComite),
      name: "fechaComite",
      label: "fechaComite",
      inputType: "string",
      error: errors.fechaComite,
    },
    {
      value: conciliacion.desicionComite,
      name: "desicionComite",
      label: "desicionComite",
      inputType: "select",
      list: lists.desicionComite,
      error: errors.desicionComite,
    },
    {
      value: conciliacion.estadoAudiencia,
      name: "estadoAudiencia",
      label: "estadoAudiencia",
      inputType: "select",
      list: lists.estadoAudiencia,
      error: errors.estadoAudiencia,
    },
    {
      value: conciliacion.procuraduriaRemitente,
      name: "procuraduriaRemitente",
      label: "procuraduriaRemitente",
      inputType: "select",
      list: lists.procuraduriaRemitente,
      error: errors.procuraduriaRemitente,
    },
    {
      value: conciliacion.numeroSolicitud,
      name: "numeroSolicitud",
      label: "numeroSolicitud",
      inputType: "string",
      error: errors.numeroSolicitud,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(conciliacion.fechaCitacionAudiencia),
      name: "fechaCitacionAudiencia",
      label: "fechaCitacionAudiencia",
      inputType: "string",
      error: errors.fechaCitacionAudiencia,
    },
    {
      value: conciliacion.observaciones,
      name: "observaciones",
      label: "observaciones",
      inputType: "string",
      error: errors.observaciones,
    },
  ];

  useEffect(() => {
    return () => {
      reset();
      handleClose();
    };
  }, []);

  useEffect(() => {
    let acumulator = 0;
    for (const property in errors) {
      if (errors[property as keyof typeof errors] !== "") {
        acumulator++;
      }
    }
    setErrorLength(acumulator);
  }, [errors]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validations()) {
      dispatch(openLoading());
      dispatch<any>(
        conciliacionDetails
          ? updateConciliaciones(conciliacion)
          : setConciliaciones(conciliacion)
      )
        .then(() => {
          dispatch(closeLoading());
          handleClose();
          swal("Guardado", "Se guardo la conciliacion", "success");
        })
        .catch((error: any) => {
          console.log(error);
          dispatch(closeLoading());
          swal("Error", "No se pudo guardar la conciliacion", "error");
        });
    }
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setConciliacion(event);
  }

  function handleLocalClose() {
    handleClose();
  }

  return (
    <form className={`toTop ${styles.form}`} onSubmit={handleSubmit}>
      <div className={styles.close}>
        <h3>Agregar conciliacion</h3>
        <div className="btn-close" onClick={handleLocalClose} />
      </div>
      <div className={styles.grid}>
        {inputs.map((data, i) =>
          data.inputType === "select" ? (
            <SelectInput
              key={i}
              name={data.name}
              value={data.value}
              label={data.label}
              list={data.list!}
              error={data.error}
              handleChange={handleChange}
            />
          ) : data.inputType === "textarea" ? (
            <TextareaInput
              key={i}
              name={data.name}
              value={data.value}
              label={data.label}
              error={data.error}
              handleChange={handleChange}
            />
          ) : (
            data.inputType !== "input" && (
              <Input
                key={i}
                name={data.name}
                value={data.value}
                label={data.label}
                type={data.inputType}
                error={data.error}
                handleChange={handleChange}
              />
            )
          )
        )}
      </div>
      <div className={styles.btnContainer}>
        <button type="submit" className="btn btn-success">
          {conciliacionDetails ? "Guardar" : "Agregar"} conciliacion
        </button>
        {errorLength ? (
          <small>
            Hay{" "}
            {errorLength === 1
              ? `${errorLength} error`
              : `${errorLength} errores`}
          </small>
        ) : null}
      </div>
    </form>
  );
}
