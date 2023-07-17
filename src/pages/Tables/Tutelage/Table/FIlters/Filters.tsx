import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";
import { useState } from "react";
import {
  TutelaFilters,
  initTutelaFilters,
} from "../../../../../interfaces/Tutelas/data";

import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";

interface Props {
  filters: TutelaFilters;
  setFilters: (filters: TutelaFilters) => void;
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
    setFilters(initTutelaFilters);
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

        {/* NRO TUTELA */}
        <div className="form-floating form-floating-dark">
          <input
            id="nroTutela"
            className="form-control form-control-dark"
            name="nroTutela"
            type="text"
            value={filters.nroTutela}
            onChange={handleChange}
          />
          <label htmlFor="nroTutela">Nro de tutela:</label>
        </div>

        {/* TEMA TUTELA */}
        <div className="form-floating">
          <input
            id="temaTutela"
            className="form-control"
            name="temaTutela"
            type="text"
            value={filters.temaTutela}
            onChange={handleChange}
          />
          <label htmlFor="temaTutela">Tema tutela:</label>
        </div>

        {/* ID DEMANDANTE */}
        <div className="form-floating form-floating-dark">
          <input
            id="demandanteId"
            className="form-control form-control-dark"
            name="demandanteId"
            type="text"
            value={filters.demandanteId}
            onChange={handleChange}
          />
          <label htmlFor="demandanteId">ID Demandante:</label>
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
          <label htmlFor="demandante">Nombre del demandante:</label>
        </div>

        {/* DERECHO VULNERADO */}
        <div className="form-floating">
          <input
            id="derechoVulnerado"
            className="form-control"
            name="derechoVulnerado"
            type="text"
            value={filters.derechoVulnerado}
            onChange={handleChange}
          />
          <label htmlFor="derechoVulnerado">Derecho vulnerado:</label>
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
