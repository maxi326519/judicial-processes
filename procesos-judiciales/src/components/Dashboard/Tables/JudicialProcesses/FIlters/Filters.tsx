import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";
import { useState } from "react";
import { ProcessesFilters } from "../../../../../interfaces/JudicialProcesses";

interface Props {
  filters: ProcessesFilters;
  handleSetFilter: (filters: ProcessesFilters) => void;
}

export default function Filters({ filters, handleSetFilter }: Props) {
  const [filter, setFilter] = useState(false);
  const [currentFilters, setFilters] = useState<ProcessesFilters>({
    firma: "",
    idEkogui: 0,
    numProcesoRamaInicial: "",
    numProcesoRamaActual: "",
    nombreDemandante: "",
  });

  function handleFilter() {
    setFilter(!filter);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
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
      {filter ? (
        <form className={style.filterContainer} onSubmit={handleSubmit}>
          {/* FIRMA */}
          <div className="form-floating">
            <select
              id="firma"
              className="form-control form-control-dark"
              name="firma"
              value={currentFilters.firma}
              onChange={handleChange}
            >
              <option value="0">Seleccionar firma</option>
            </select>
            <label htmlFor="firma">Firma</label>
          </div>

          {/* ID EKOGUI */}
          <div className="form-floating form-floating-dark">
            <input
              id="idEkogui"
              className="form-control form-control-dark"
              name="idEkogui"
              type="number"
              value={currentFilters.idEkogui}
              onChange={handleChange}
            />
            <label htmlFor="idEkogui">ID Ekogui</label>
          </div>

          {/* INITIAL NUMBER */}
          <div className="form-floating">
            <input
              id="initialNumber"
              className="form-control"
              type="text"
              name="initialNumber"
              value={currentFilters.numProcesoRamaInicial}
              onChange={handleChange}
            />
            <label htmlFor="initialNumber">
              Número de proceso rama judicial (INICIAL)
            </label>
          </div>

          {/* CURRENT NUMBER */}
          <div className="form-floating">
            <input
              id="currentNumber"
              className="form-control"
              name="currentNumber"
              type="text"
              value={currentFilters.numProcesoRamaActual}
              onChange={handleChange}
            />
            <label htmlFor="currentNumber">
              Número de proceso rama judicial (ACTUAL)
            </label>
          </div>

          {/* DEMANDING */}
          <div className="form-floating">
            <input
              id="demanding"
              className="form-control"
              name="demanding"
              type="text"
              value={currentFilters.nombreDemandante}
              onChange={handleChange}
            />
            <label htmlFor="demanding">Nombre del demandante</label>
          </div>

          <button className="btn btn-success" type="submit">
            Aplicar
          </button>
        </form>
      ) : null}
    </div>
  );
}
