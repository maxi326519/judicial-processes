import { useState } from "react";
import {
  ProcessFilters,
  initProcessFilters,
} from "../../../../../interfaces/Processes/data";
import { UserRol } from "../../../../../interfaces/users";
import { RootState } from "../../../../../interfaces/RootState";
import { useSelector } from "react-redux";

import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";

interface Props {
  filters: ProcessFilters;
  setFilters: (filters: ProcessFilters) => void;
}

export default function Filters({ filters, setFilters }: Props) {
  const user = useSelector((state: RootState) => state.sesion);
  const users = useSelector((state: RootState) => state.users);
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
    setFilters(initProcessFilters);
  }

  return (
    <div className={style.filter}>
      <button className={style.btnFilter} type="button" onClick={handleFilter}>
        <span>Filtros</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      <form className={style.filterContainer}>
        {/* APODERADO ACTUAL */}
        {user.rol === UserRol.Admin ? (
          <div className="form-floating">
            <select
              id="apoderadoActual"
              className="form-select form-control-dark"
              name="apoderadoActual"
              value={filters.apoderadoActual}
              onChange={handleChange}
            >
              <option value="">Seleccionar Apoderado</option>
              {users.map((user) => (
                <option key={user.name}>{user.name}</option>
              ))}
            </select>
            <label htmlFor="apoderadoActual">Apoderado actual:</label>
          </div>
        ) : null}

        {/* ID SIPROJ */}
        <div className="form-floating form-floating-dark">
          <input
            id="idSiproj"
            className="form-control form-control-dark"
            name="idSiproj"
            type="number"
            value={filters.idSiproj}
            onChange={handleChange}
          />
          <label htmlFor="idSiproj">ID Siproj:</label>
        </div>

        {/* RAD DE RAMA JUDICIAL INICIAL */}
        <div className="form-floating">
          <input
            id="radRamaJudicialInicial"
            className="form-control"
            type="text"
            name="radRamaJudicialInicial"
            value={filters.radRamaJudicialInicial}
            onChange={handleChange}
          />
          <label htmlFor="radRamaJudicialInicial">
            Rad. de proceso rama judicial (INICIAL)
          </label>
        </div>

        {/* RUD DE RAMA JUDICIAL ACTUAL */}
        <div className="form-floating">
          <input
            id="radRamaJudicialActual"
            className="form-control"
            name="radRamaJudicialActual"
            type="text"
            value={filters.radRamaJudicialActual}
            onChange={handleChange}
          />
          <label htmlFor="radRamaJudicialActual">
            Rad. de proceso rama judicial (ACTUAL)
          </label>
        </div>

        {/* DEMANDANTE */}
        <div className="form-floating">
          <input
            id="demandante"
            className="form-control"
            name="demandante"
            type="text"
            value={filters.demandante}
            onChange={handleChange}
          />
          <label htmlFor="demandante">Nombre del demandante</label>
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
