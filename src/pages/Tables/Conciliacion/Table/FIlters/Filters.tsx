import { dateToString } from "../../../../../functions/dateToString";
import { useState } from "react";
import {
  initConciliacionesFilters,
  ConciliacionesFilters,
} from "../../../../../interfaces/Conciliaciones/data";

import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";

interface Props {
  filters: ConciliacionesFilters;
  setFilters: (filters: ConciliacionesFilters) => void;
}

export default function Filters({ filters, setFilters }: Props) {
  const [filter, setFilter] = useState(false);

  function handleFilter() {
    setFilter(!filter);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  function handleReset() {
    setFilters(initConciliacionesFilters());
  }

  return (
    <div className={style.filter}>
      <button className={style.btnFilter} type="button" onClick={handleFilter}>
        <span>Filtros</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      <form className={style.filterContainer}>
        {/* Add filters */}

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
            type="text"
            value={dateToString(filters.fechaIngresoSolicitud)}
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
            id="desicionComite"
            className="form-control form-control-dark"
            name="desicionComite"
            type="text"
            value={filters.desicionComite}
            onChange={handleChange}
          />
          <label htmlFor="desicionComite">Desición de Comité:</label>
        </div>

        <button
          className="btn btn-outline-success"
          onClick={handleReset}
          type="button"
        >
          Borrar
        </button>
      </form>
    </div>
  );
}
