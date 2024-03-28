import {
  initPoderesFilters,
  PoderesFilters,
} from "../../../../../interfaces/Poderes/data";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { useState } from "react";
import { UserRol } from "../../../../../interfaces/users";

import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";

interface Props {
  filters: PoderesFilters;
  setFilters: (filters: PoderesFilters) => void;
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
    setFilters(initPoderesFilters());
  }

  return (
    <div className={style.filter}>
      <button className={style.btnFilter} type="button" onClick={handleFilter}>
        <span>Filtros</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      <form className={style.filterContainer}>
        {/* ABOGADO */}
        {user.rol === UserRol.Admin ? (
          <div className="form-floating">
            <select
              id="abogado"
              className="form-select form-control-dark"
              name="abogado"
              value={filters.abogado}
              onChange={handleChange}
            >
              <option value="">Seleccionar abogado</option>
              {users.map((user) => (
                <option key={user.name}>{user.name}</option>
              ))}
            </select>
            <label htmlFor="abogado">Abogado:</label>
          </div>
        ) : null}

        {/* RADICADO SIPA */}
        <div className="form-floating form-floating-dark">
          <input
            id="radicadoSipa"
            className="form-control form-control-dark"
            name="radicadoSipa"
            type="text"
            value={filters.radicadoSipa}
            onChange={handleChange}
          />
          <label htmlFor="radicadoSipa">Radicado Sipa:</label>
        </div>

        {/* CONCEPTO */}
        <div className="form-floating form-floating-dark">
          <input
            id="concepto"
            className="form-control form-control-dark"
            name="concepto"
            type="text"
            value={filters.concepto}
            onChange={handleChange}
          />
          <label htmlFor="concepto">Concepto:</label>
        </div>

        {/* ACCIDENTE */}
        <div className="form-floating form-floating-dark">
          <input
            id="accionante"
            className="form-control form-control-dark"
            name="accionante"
            type="text"
            value={filters.accionante}
            onChange={handleChange}
          />
          <label htmlFor="accionante">Accionante:</label>
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
