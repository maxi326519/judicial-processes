import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import {
  updateRequirements,
  setRequirements as postRequirement,
} from "../../../../../redux/actions/Requirements/requirements";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
import useRequirements from "../../../../../hooks/Requirements/useRequirements";
import dateUTCToLocalDateYYYYMMDD from "../../../../../functions/dateToStringInput";
import swal from "sweetalert";

import Input from "../../../../../components/Inputs/Input";
import SelectInput from "../../../../../components/Inputs/SelectInput";
import TextareaInput from "../../../../../components/Inputs/TextareaInput";
import Checkbox from "../../../../../components/Inputs/Checkbox";

import styles from "./Form.module.css";

interface Props {
  handleClose: () => void;
}

export default function Form({ handleClose }: Props) {
  const dispatch = useDispatch();
  const { requirement, errors, validations, reset, setRequirement, setErrors } =
    useRequirements();
  const requirementsDetails = useSelector(
    (state: RootState) => state.requirements.details
  );
  const users = useSelector((state: RootState) => state.users);
  const lists = useSelector((state: RootState) => state.requirements.lists);
  const [errorLength, setErrorLength] = useState<number>(0);

  const inputs = [
    {
      value: requirement.consecutivo,
      name: "consecutivo",
      label: "Consecutivo",
      inputType: "number",
      error: errors.consecutivo,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(requirement.fechaNotificacion),
      name: "fechaNotificacion",
      label: "Fecha de notificación",
      inputType: "date",
      error: errors.fechaNotificacion,
    },
    {
      value: requirement.radicadoSipa,
      name: "radicadoSipa",
      label: "Radicado en SIPA",
      inputType: "text",
      error: errors.radicadoSipa,
    },
    {
      value: requirement.otrosRadicadosSipa,
      name: "otrosRadicadosSipa",
      label: "Otros radicados en sipa",
      inputType: "text",
      error: errors.otrosRadicadosSipa,
    },
    {
      value: requirement.remitenteGeneral,
      name: "remitenteGeneral",
      label: "Remitente general",
      inputType: "select",
      list: lists.remitenteGeneral,
      error: errors.remitenteGeneral,
    },
    {
      value: requirement.remitenteEspecifico,
      name: "remitenteEspecifico",
      label: "Remitente Epecifico",
      inputType: "select",
      list: lists.remitenteEspecifico,
      error: errors.remitenteEspecifico,
    },
    {
      value: requirement.direccion,
      name: "direccion",
      label: "Dirección",
      inputType: "text",
      error: errors.direccion,
    },
    {
      value: requirement.concepto,
      name: "concepto",
      label: "Concepto",
      inputType: "textarea",
      error: errors.concepto,
    },
    {
      value: requirement.tipoProceso,
      name: "tipoProceso",
      label: "Tipo de proceso",
      inputType: "select",
      list: lists.tipoProceso,
      error: errors.tipoProceso,
    },
    {
      value: requirement.numeroProceso,
      name: "numeroProceso",
      label: "Número de proceso",
      inputType: "text",
      error: errors.numeroProceso,
    },
    {
      value: requirement.abogado,
      name: "abogado",
      label: "Abogado",
      inputType: "select",
      list: users
        .filter(
          (user) =>
            user.id !== "2RuL7ejyY7ftgEAL4j7jy2RyOXQ2" && // Filter one user
            user.permissions?.requirements && // Filter only they have access
            !user.available // Filter users dont availables
        )
        .map((user) => user.name),
      error: errors.abogado,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(requirement.fechaVencimiento),
      name: "fechaVencimiento",
      label: "Fecha de vencimiento",
      inputType: "date",
      error: errors.fechaVencimiento,
    },
    {
      value: requirement.solicitudDadep,
      name: "solicitudDadep",
      label: "Solicitud Dadep",
      inputType: "text",
      error: errors.solicitudDadep,
    },
    {
      value: requirement.areaApoyo,
      name: "areaApoyo",
      label: "Area de apoyo",
      inputType: "select",
      list: lists.areaApoyo,
      error: errors.areaApoyo,
    },
    {
      value: requirement.solicitudConcepto,
      name: "solicitudConcepto",
      label: "Solicitud concepto",
      inputType: "text",
      error: errors.solicitudConcepto,
    },
    {
      value: requirement.respuestaSolicitud,
      name: "respuestaSolicitud",
      label: "Respuesta solicitud",
      inputType: "text",
      error: errors.respuestaSolicitud,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(requirement.fechaRespuesta),
      name: "fechaRespuesta",
      label: "Fecha de respuesta",
      inputType: "date",
      error: errors.fechaRespuesta,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(requirement.respuestaSipa),
      name: "respuestaSipa",
      label: "Respuesta SIPA",
      inputType: "date",
      error: errors.respuestaSipa,
    },
    {
      value: requirement.estado,
      name: "estado",
      label: "Estado",
      inputType: "select",
      list: lists.estado,
      error: errors.estado,
    },
    {
      value: requirement.observaciones,
      name: "observaciones",
      label: "Observaciones",
      inputType: "textarea",
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
        requirementsDetails
          ? updateRequirements(requirement)
          : postRequirement(requirement)
      )
        .then(() => {
          dispatch(closeLoading());
          handleClose();
          swal("Guardado", "Se guardo el requirimiento", "success");
        })
        .catch((error: any) => {
          console.log(error);
          dispatch(closeLoading());
          swal("Error", "No se pudo guardar la requirimiento", "error");
        });
    }
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setRequirement(event);
  }

  function handleLocalClose() {
    handleClose();
  }

  return (
    <form className={`toTop ${styles.form}`} onSubmit={handleSubmit}>
      <div className={styles.close}>
        <h3>Agregar requerimientos</h3>
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
          ) : data.inputType === "checkbox" ? (
            <Checkbox
              name={data.name}
              value={data.value}
              label={data.label}
              handleCheck={handleChange}
            />
          ) : (
            typeof data.value !== "boolean" && (
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
          {requirementsDetails ? "Guardar" : "Agregar"} requerimientos
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
