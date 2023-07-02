import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import useTutelas from "../../../../../hooks/Tutela/useTutelas";
import {
  setTutelas,
  updateTutelas,
} from "../../../../../redux/actions/Tutelas/tutelas";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
import swal from "sweetalert";

import Input from "../../../../../components/Inputs/Input";
import SelectInput from "../../../../../components/Inputs/SelectInput";
import TextareaInput from "../../../../../components/Inputs/TextareaInput";

import styles from "./Form.module.css";
import { dateToTime } from "../../../../../functions/dateToTime";
import Checkbox from "../../../../../components/Inputs/Checkbox";
import dateUTCToLocalDateYYYYMMDD from "../../../../../functions/dateToStringInput";

interface Props {
  handleClose: () => void;
}

export default function Form({ handleClose }: Props) {
  const dispatch = useDispatch();
  const { tutela, errors, validations, reset, setTutela, setErrors } =
    useTutelas();
  const tutelaDetails = useSelector(
    (state: RootState) => state.tutelas.details
  );
  const users = useSelector((state: RootState) => state.users);
  const lists = useSelector((state: RootState) => state.tutelas.lists);
  const [errorLength, setErrorLength] = useState<number>(0);

  const inputs = [
    {
      value: tutela.idSiproj,
      name: "idSiproj",
      label: "ID Siproj",
      inputType: "number",
      error: errors.idSiproj,
    },
    {
      value: tutela.nroTutela,
      name: "nroTutela",
      label: "Nro de tutela",
      inputType: "text",
      error: errors.nroTutela,
    },
    {
      value: tutela.abogado,
      name: "abogado",
      label: "Abogado",
      inputType: "select",
      list: users.map((user) => user.name),
      error: errors.abogado,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(tutela.fecha),
      name: "fecha",
      label: "Fecha",
      inputType: "date",
      error: errors.fecha,
    },
    {
      value: dateToTime(tutela.fecha),
      name: "fecha",
      label: "Hora",
      inputType: "time",
      error: errors.fecha,
    },
    {
      value: tutela.demandanteId,
      name: "demandanteId",
      label: "Identificación del demandante",
      inputType: "text",
      error: errors.demandanteId,
    },
    {
      value: tutela.demandante,
      name: "demandante",
      label: "Demandante",
      inputType: "text",
      error: errors.demandante,
    },
    {
      value: tutela.demandado,
      name: "demandado",
      label: "Demandado",
      inputType: "text",
      error: errors.demandado,
    },
    {
      value: tutela.radicado,
      name: "radicado",
      label: "Radicado",
      inputType: "text",
      error: errors.radicado,
    },
    {
      value: tutela.tipo,
      name: "tipo",
      label: "Tipo de tutela",
      inputType: "select",
      list: lists.tipo,
      error: errors.tipo,
    },
    {
      value: tutela.temaTutela,
      name: "temaTutela",
      label: "Tema de la tutela",
      inputType: "select",
      list: lists.temaTutela,
      error: errors.temaTutela,
    },
    {
      value: tutela.derechoVulnerado,
      name: "derechoVulnerado",
      label: "Derecho vulnerado",
      inputType: "select",
      list: lists.derechoVulnerado,
      error: errors.derechoVulnerado,
    },
    {
      value: tutela.extranjero,
      name: "extranjero",
      label: "Extranjero",
      inputType: "checkbox",
      error: errors.extranjero,
    },
    {
      value: tutela.concepto,
      name: "concepto",
      label: "Concepto",
      inputType: "textarea",
      error: errors.concepto,
    },
    {
      value: tutela.termino,
      name: "termino",
      label: "Término",
      inputType: "text",
      error: errors.termino,
    },
    {
      value: tutela.remite,
      name: "remite",
      label: "Remite o despacho judicial",
      inputType: "select",
      list: lists.remite,
      error: errors.remite,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(tutela.fechaVencimiento),
      name: "fechaVencimiento",
      label: "Fecha de vencimiento",
      inputType: "date",
      formulated: true,
      error: errors.fechaVencimiento,
    },
    {
      value: dateToTime(tutela.fechaVencimiento),
      name: "fechaVencimiento",
      label: "Hora de vencimiento",
      inputType: "time",
      formulated: true,
      error: errors.fechaVencimiento,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(tutela.fechaRespuesta),
      name: "fechaRespuesta",
      label: "Fecha de respuesta",
      inputType: "date",
      error: errors.fechaRespuesta,
    },
    {
      value: dateToTime(tutela.fechaRespuesta),
      name: "fechaRespuesta",
      label: "Hora de respuesta",
      inputType: "time",
      error: errors.fechaRespuesta,
    },
    {
      value: tutela.validacionRespuesta,
      name: "validacionRespuesta",
      label: "Validacion de la respuesta",
      inputType: "text",
      formulated: true,
      error: errors.validacionRespuesta,
    },
    {
      value: tutela.radicadoSalida,
      name: "radicadoSalida",
      label: "Radicado de salida",
      inputType: "text",
      error: errors.radicadoSalida,
    },
    {
      value: tutela.oficioAdicional,
      name: "oficioAdicional",
      label: "Oficio adicional",
      inputType: "text",
      error: errors.oficioAdicional,
    },
    {
      value: tutela.fallo1raInst,
      name: "fallo1raInst",
      label: "Fallo de la 1ra instancia",
      inputType: "select",
      list: lists.fallo1raInst,
      error: errors.fallo1raInst,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(tutela.fechaFallo1raInst),
      name: "fechaFallo1raInst",
      label: "Fecha del fallo de la 1ra instancia",
      inputType: "date",
      error: errors.fechaFallo1raInst,
    },
    {
      value: tutela.observacionFallo1raInst,
      name: "observacionFallo1raInst",
      label: "Observación del fallo de la 1ra instancia",
      inputType: "textarea",
      error: errors.observacionFallo1raInst,
    },
    {
      value: tutela.terminoCumplimiento1raInst,
      name: "terminoCumplimiento1raInst",
      label: "Término de cumplimiento de la 1ra instancia",
      inputType: "number",
      error: errors.terminoCumplimiento1raInst,
    },
    {
      value: tutela.cumplimiento1raInst,
      name: "cumplimiento1raInst",
      label: "Cumplimiento de la 1ra instancia",
      inputType: "text",
      error: errors.cumplimiento1raInst,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(tutela.fechaCumplimiento1raInst),
      name: "fechaCumplimiento1raInst",
      label: "Fecha de cumplimiento de la 1ra instancia",
      inputType: "date",
      formulated: true,
      error: errors.fechaCumplimiento1raInst,
    },
    {
      value: tutela.impugnacionSDP,
      name: "impugnacionSDP",
      label: "Impugnacion SDP",
      inputType: "number",
      error: errors.impugnacionSDP,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(tutela.fechaImpugnacion),
      name: "fechaImpugnacion",
      label: "Fecha de impugnación",
      inputType: "date",
      error: errors.fechaImpugnacion,
    },
    {
      value: tutela.fallo2daInst,
      name: "fallo2daInst",
      label: "Fallo de la 2da instancia",
      inputType: "select",
      list: lists.fallo2daInst,
      error: errors.fallo2daInst,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(tutela.fechaFallo2daInst),
      name: "fechaFallo2daInst",
      label: "Fecha de fallo de la 2da instancia",
      inputType: "date",
      error: errors.fechaFallo2daInst,
    },
    {
      value: tutela.observacionFallo2daInst,
      name: "observacionFallo2daInst",
      label: "Observación fallo de la 2da instancia",
      inputType: "textarea",
      error: errors.observacionFallo2daInst,
    },
    {
      value: tutela.terminoCumplimiento2daInst,
      name: "terminoCumplimiento2daInst",
      label: "Término de cumplimiento de la 2da instancia",
      inputType: "number",
      error: errors.terminoCumplimiento2daInst,
    },
    {
      value: tutela.cumplimiento2daInst,
      name: "cumplimiento2daInst",
      label: "Cumplimiento de la 2da instancia",
      inputType: "text",
      error: errors.cumplimiento2daInst,
    },
    {
      value: dateUTCToLocalDateYYYYMMDD(tutela.fechaCumplimiento2daInst),
      name: "fechaCumplimiento2daInst",
      label: "Fecha cumplimiento de la 2da instancia",
      inputType: "date",
      formulated: true,
      error: errors.fechaCumplimiento2daInst,
    },
    {
      value: tutela.incidenteDesacato,
      name: "incidenteDesacato",
      label: "Incidente de desacato",
      inputType: "text",
      error: errors.incidenteDesacato,
    },
    {
      value: tutela.observacionesGenerales,
      name: "observacionesGenerales",
      label: "Observaciones generales",
      inputType: "textarea",
      error: errors.observacionesGenerales,
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
      dispatch<any>(tutelaDetails ? updateTutelas(tutela) : setTutelas(tutela))
        .then(() => {
          dispatch(closeLoading());
          handleClose();
          swal("Guardado", "Se guardo la tutela", "success");
        })
        .catch((error: any) => {
          console.log(error);
          dispatch(closeLoading());
          if (error.message.includes("Ya existe el id")) {
            setErrors({ ...errors, idSiproj: "Ya existe este id" });
          } else {
            swal("Error", "No se pudo guardar la tutela", "error");
          }
        });
    }
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setTutela(event);
  }

  function handleLocalClose() {
    handleClose();
  }

  return (
    <form className={`toTop ${styles.form}`} onSubmit={handleSubmit}>
      <div className={styles.close}>
        <h3>Agregar tutela</h3>
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
                formulated={data.formulated}
                error={data.error}
                handleChange={handleChange}
              />
            )
          )
        )}
      </div>
      <div className={styles.btnContainer}>
        <button type="submit" className="btn btn-success">
          {tutelaDetails ? "Guardar proceso" : "Agregar proceso"}
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
