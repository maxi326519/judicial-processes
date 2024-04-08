import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { useState } from "react";
import { UserRol } from "../../../../../interfaces/users";
import {
  ProcessFilters,
  ProcessState,
  initProcessFilters,
} from "../../../../../interfaces/Processes/data";

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

        {/* TIPO DE PROCESO */}
        <div className="form-floating">
          <input
            id="tipoProceso"
            className="form-control"
            name="tipoProceso"
            type="text"
            value={filters.tipoProceso}
            onChange={handleChange}
          />
          <label htmlFor="tipoProceso">Tipo de proceso</label>
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

        {/* POSICION SPD */}
        <div className="form-floating">
          <input
            id="posicionSDP"
            className="form-control"
            name="posicionSDP"
            type="text"
            value={filters.posicionSDP}
            onChange={handleChange}
          />
          <label htmlFor="posicionSDP">Posicion SPD</label>
        </div>

        {/* ESTADO */}
        <div className="form-floating">
          <select
            id="estado"
            className="form-control"
            name="estado"
            value={filters.estado}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value={ProcessState.Activo}>{ProcessState.Activo}</option>
            <option value={ProcessState.Terminado}>
              {ProcessState.Terminado}
            </option>
          </select>
          <label htmlFor="posicionSDP">Estado</label>
        </div>

        {/* Actuacion */}
        <div className="form-floating">
          <select
            id="actuacion"
            className="form-control"
            name="actuacion"
            value={filters.actuacion}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="true">Con cambios</option>
            <option value="false">Sin cambios</option>
          </select>
          <label htmlFor="actuacion">Actuacion</label>
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
