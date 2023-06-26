import { useState } from "react";
import {
  TutelaFilters,
  initTutelaFilters,
} from "../../../../../../interfaces/Tutelas/data";

import style from "./Filter.module.css";
import filterSvg from "../../../../../../assets/svg/filter.svg";

interface Props {
  filters: TutelaFilters;
  handleSetFilter: (filters: TutelaFilters) => void;
}

export default function Filters({ filters, handleSetFilter }: Props) {
  const [filter, setFilter] = useState(false);
  const [currentFilters, setFilters] =
    useState<TutelaFilters>(initTutelaFilters);

  function handleFilter() {
    setFilter(!filter);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFilters({ ...currentFilters, [event.target.name]: event.target.value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSetFilter(currentFilters);
  }

  return (
    <div className={style.filter}>
      <button className={style.btnFilter} type="button" onClick={handleFilter}>
        <span>Filtros</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      <form className={style.filterContainer} onSubmit={handleSubmit}>
        {/* ID SIPROJ */}
        <div className="form-floating form-floating-dark">
          <input
            id="idSiproj"
            className="form-control form-control-dark"
            name="idSiproj"
            type="number"
            value={currentFilters.idSiproj}
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
            type="number"
            value={currentFilters.nroTutela}
            onChange={handleChange}
          />
          <label htmlFor="nroTutela">Nro de tutela:</label>
        </div>

        {/* ID DEMANDANTE */}
        <div className="form-floating form-floating-dark">
          <input
            id="demandanteId"
            className="form-control form-control-dark"
            name="demandanteId"
            type="number"
            value={currentFilters.demandanteId}
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
            value={currentFilters.demandante}
            onChange={handleChange}
          />
          <label htmlFor="demandante">Nombre del demandante</label>
        </div>

        <button className="btn btn-success" type="submit">
          Aplicar
        </button>
      </form>
    </div>
  );
}
