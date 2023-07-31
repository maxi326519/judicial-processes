import { useState } from "react";
import { Users } from "../../../../interfaces/users";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { updateUser } from "../../../../redux/actions/users";

import Input from "../../../../components/Inputs/Input";

import styles from "./AvailableForm.module.css";
import swal from "sweetalert";

interface Props {
  user: Users | null;
  handleClose: (user: Users | null) => void;
}

interface Dates {
  startDate: Date | null;
  endDate: Date | null;
}

interface Error {
  startDate: string;
  endDate: string;
}

const initDates = (): Dates => ({
  startDate: null,
  endDate: null,
});

const initError = (): Error => ({
  startDate: "",
  endDate: "",
});

export function AvailableForm({ user, handleClose }: Props) {
  const dispatch = useDispatch();
  const [dates, setDates] = useState<Dates>(initDates());
  const [errors, setErrors] = useState(initError());

  function handleDatesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const name = event.target.name;

    if (value) setDates({ ...dates, [name]: new Date(event.target.value) });
    else setDates({ ...dates, [name]: null });

    // Check if 'endDate' is valid date
    if (
      dates.startDate &&
      name === "endDate" &&
      dates.startDate >= new Date(value)
    ) {
      setErrors({
        ...errors,
        endDate: "Debe ser despues de la fecha de inicio",
      });
    } else if (
      dates.endDate &&
      name === "startDate" &&
      new Date(value) >= dates.endDate
    ) {
      // Check if 'startDate' is valid date
      setErrors({
        ...errors,
        startDate: "Debe ser antes de la fecha de finalización",
      });
    } else {
      setErrors({ ...errors, [event.target.name]: "" });
    }
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(user, validations());

    // If user exist
    if (user) {
      // Extract available
      let { available, ...userAvalidable } = user;

      // If 'available' dont exist create them
      if (!available) {
        const newUser = { ...user, available: dates };
        userAvalidable = newUser;
      }

      // Update data
      if ((user.available) || (!user.available && validations())) {
        dispatch(openLoading());
        dispatch<any>(updateUser(userAvalidable))
          .then(() => {
            handleClose(null);
            dispatch(closeLoading());
            swal("Guardado", "Se guardo el usuario", "success");
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "No se pudo guardar el usuario, inténtelo más tarde",
              "error"
            );
          });
      }
    }
  }

  function validations() {
    let errors: Error = initError();
    let value: boolean = true;

    if (dates.startDate === null) {
      errors.startDate = "Debes completar la fecha de inicio";
      value = false;
    }

    if (dates.endDate === null) {
      errors.endDate = "Debes completar la fecha de finalización";
      value = false;
    }

    setErrors(errors);
    return value;
  }

  return (
    <div className={styles.background}>
      <form className={`toTop ${styles.form}`} onSubmit={handleSubmit}>
        <div className={styles.close}>
          <h4>Disponibilidad</h4>
          <div className="btn-close" onClick={() => handleClose(null)} />
        </div>
        <div className={styles.flex}>
          {user?.available ? (
            <span>
              ¿Quiere cambiar el estado a diponible para este usuario?
            </span>
          ) : (
            <div>
              <span>Seleccionar fechas</span>
              <div className={styles.inputs}>
                <Input
                  name="startDate"
                  type="date"
                  label="Inicio"
                  value={dates.startDate?.toISOString().split("T")[0] || ""}
                  error={errors.startDate}
                  handleChange={handleDatesChange}
                />
                <Input
                  name="endDate"
                  type="date"
                  label="Finalización"
                  value={dates.endDate?.toISOString().split("T")[0] || ""}
                  error={errors.endDate}
                  handleChange={handleDatesChange}
                />
              </div>
            </div>
          )}
        </div>
        <button className="btn btn-success" type="submit">
          Cambiar disponibilidad
        </button>
      </form>
    </div>
  );
}
