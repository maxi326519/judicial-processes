import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../../../interfaces/RootState";
import {
  setPoderes,
  updatePoderes,
} from "../../../../../redux/actions/Poderes/poderes";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
import dateUTCToLocalDateYYYYMMDD from "../../../../../functions/dateToStringInput";
import usePoderes from "../../../../../hooks/Poderes/usePoderes";
import swal from "sweetalert";

import Input from "../../../../../components/Inputs/Input";
import SelectInput from "../../../../../components/Inputs/SelectInput";
import TextareaInput from "../../../../../components/Inputs/TextareaInput";

import styles from "./Form.module.css";
import { UserRol } from "../../../../../interfaces/users";

interface Props {
  handleClose: () => void;
}

export default function Form({ handleClose }: Props) {
  const dispatch = useDispatch();
  const { poder, errors, validations, reset, setPoder, setErrors } =
    usePoderes();
  const poderDetails = useSelector((state: RootState) => state.poderes.details);
  const users = useSelector((state: RootState) => state.users);
  const lists = useSelector((state: RootState) => state.poderes.lists);
  const [errorLength, setErrorLength] = useState<number>(0);

  const inputs = [
    {
      value: dateUTCToLocalDateYYYYMMDD(poder.fechaRadicacion),
      name: "fechaRadicacion",
      label: "fechaRadicacion",
      inputType: "date",
      error: errors.fechaRadicacion,
    },
    {
      value: poder.radicadoSipa,
      name: "radicadoSipa",
      label: "radicadoSipa",
      inputType: "string",
      error: errors.radicadoSipa,
    },
    {
      value: poder.abogado,
      name: "abogado",
      label: "abogado",
      inputType: "select",
      list: users
        .filter(
          (user) =>
            user.id !== "2RuL7ejyY7ftgEAL4j7jy2RyOXQ2" && // Filter one user
            (user.permissions?.poderes || user.rol === UserRol.Admin) && // Filter only they have access
            !(
              user.available && // If available exist
              user.available.startDate! <= new Date() && // If the date is within the range
              user.available.endDate! >= new Date()
            )
        )
        .map((user) => user.name),
      error: errors.abogado,
    },
    {
      value: poder.concepto,
      name: "concepto",
      label: "concepto",
      inputType: "select",
      list: lists.concepto,
      error: errors.concepto,
    },
    {
      value: poder.proceso,
      name: "proceso",
      label: "proceso",
      inputType: "select",
      list: lists.proceso,
      error: errors.proceso,
    },
    {
      value: poder.numero,
      name: "numero",
      label: "numero",
      inputType: "string",
      error: errors.numero,
    },
    {
      value: poder.accionante,
      name: "accionante",
      label: "accionante",
      inputType: "string",
      error: errors.accionante,
    },
    {
      value: poder.observaciones,
      name: "observaciones",
      label: "observaciones",
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
      dispatch<any>(poderDetails ? updatePoderes(poder) : setPoderes(poder))
        .then(() => {
          dispatch(closeLoading());
          handleClose();
          swal("Guardado", "Se guardo la poder", "success");
        })
        .catch((error: any) => {
          console.log(error);
          dispatch(closeLoading());
          swal("Error", "No se pudo guardar la poder", "error");
        });
    }
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setPoder(event);
  }

  function handleLocalClose() {
    handleClose();
  }

  return (
    <form className={`toTop ${styles.form}`} onSubmit={handleSubmit}>
      <div className={styles.close}>
        <h3>Agregar poder</h3>
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
          {poderDetails ? "Guardar" : "Agregar"} poder
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
