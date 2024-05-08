import { useEffect, useRef, useState } from "react";
import {
  initConciliacionesFilters,
  ConciliacionesFilters,
} from "../../../../../interfaces/Conciliaciones/data";
import fetDateYYYYMMDD from "../../../../../functions/dateToStringInput";

import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";

interface Props {
  filters: ConciliacionesFilters;
  setFilters: (filters: ConciliacionesFilters) => void;
}

export default function Filters({ filters, setFilters }: Props) {
  const [filter, setFilter] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  // Close filter
  useEffect(() => {
    // Function to get mouse event
    const handleClickOutside = (event: MouseEvent) => {
      // If ref exist and not contain the event, close filter
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setFilter(false);
      }
    };

    // Set mouse event to close filter if user clicked outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event when the component closes
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleFilter() {
    setFilter(!filter);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    if (name === "fechaIngresoSolicitud") {
      // If value is empty set null
      if (value === "") {
        setFilters({
          ...filters,
          [name]: null,
        });
      } else {
        const dateValue = new Date(`${value} 00:00:00`);

        // Only sabe if is valid date
        if (!isNaN(dateValue.getTime())) {
          setFilters({
            ...filters,
            [name]: dateValue,
          });
        }
      }
    } else {
      setFilters({ ...filters, [name]: value });
    }
  }

  function handleReset() {
    setFilters(initConciliacionesFilters());
  }

  function handleChangeState(estado: number) {
    setFilters({ ...filters, estado });
  }

  return (
    <div className={style.filter} ref={dropDownRef}>
      <button className={style.btnFilter} type="button" onClick={handleFilter}>
        <span>Filtros</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      {filter && (
        <form className={style.filterContainer}>
          <div className="form-floating form-floating-dark">
            <input
              id="id"
              className="form-control form-control-dark"
              name="id"
              type="text"
              value={filters.id}
              onChange={handleChange}
            />
            <label htmlFor="id">ID:</label>
          </div>

          <div className="form-floating form-floating-dark">
            <input
              id="fechaIngresoSolicitud"
              className="form-control form-control-dark"
              name="fechaIngresoSolicitud"
              type="date"
              value={fetDateYYYYMMDD(filters.fechaIngresoSolicitud)}
              onChange={handleChange}
            />
            <label htmlFor="fechaIngresoSolicitud">
              Fecha de ingreso de la solicitud:
            </label>
          </div>

          <div className="form-floating form-floating-dark">
            <input
              id="radicadoSIPA"
              className="form-control form-control-dark"
              name="radicadoSIPA"
              type="text"
              value={filters.radicadoSIPA}
              onChange={handleChange}
            />
            <label htmlFor="radicadoSIPA">Radicado SIPA:</label>
          </div>

          <div className="form-floating form-floating-dark">
            <input
              id="convocante"
              className="form-control form-control-dark"
              name="convocante"
              type="text"
              value={filters.convocante}
              onChange={handleChange}
            />
            <label htmlFor="convocante">Convocante:</label>
          </div>

          <div className="form-floating form-floating-dark">
            <input
              id="asignacionAbogado"
              className="form-control form-control-dark"
              name="asignacionAbogado"
              type="text"
              value={filters.asignacionAbogado}
              onChange={handleChange}
            />
            <label htmlFor="asignacionAbogado">Asignacion abogado:</label>
          </div>

          <div className="form-floating form-floating-dark">
            <input
              id="estadoSolicitud"
              className="form-control form-control-dark"
              name="estadoSolicitud"
              type="text"
              value={filters.estadoSolicitud}
              onChange={handleChange}
            />
            <label htmlFor="estadoSolicitud">Estado de la solicitud:</label>
          </div>

          <div className="form-floating form-floating-dark">
            <input
              id="medioControl"
              className="form-control form-control-dark"
              name="medioControl"
              type="text"
              value={filters.medioControl}
              onChange={handleChange}
            />
            <label htmlFor="medioControl">Medio de Control:</label>
          </div>

          <div className="form-floating form-floating-dark">
            <input
              id="decisionComite"
              className="form-control form-control-dark"
              name="decisionComite"
              type="text"
              value={filters.decisionComite}
              onChange={handleChange}
            />
            <label htmlFor="decisionComite">Decisión de Comité:</label>
          </div>

          <div className={style.signal}>
            <span>Estado</span>
            <div
              className={`${style.state1} ${
                filters.estado === 1 && style.selected
              }`}
              onClick={() => handleChangeState(1)}
            ></div>
            <div
              className={`${style.state2} ${
                filters.estado === 2 && style.selected
              }`}
              onClick={() => handleChangeState(2)}
            ></div>
            <div
              className={`${style.state3} ${
                filters.estado === 3 && style.selected
              }`}
              onClick={() => handleChangeState(3)}
            ></div>
          </div>

          <button
            className="btn btn-outline-success"
            onClick={handleReset}
            type="button"
          >
            Borrar
          </button>
        </form>
      )}
    </div>
  );
}
