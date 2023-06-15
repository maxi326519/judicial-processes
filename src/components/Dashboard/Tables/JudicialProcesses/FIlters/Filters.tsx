import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";
import { useState } from "react";
import { ProcessesFilters } from "../../../../../interfaces/JudicialProcesses";
import { UserRol } from "../../../../../interfaces/users";
import { RootState } from "../../../../../interfaces/RootState";
import { useSelector } from "react-redux";

interface Props {
  filters: ProcessesFilters;
  handleSetFilter: (filters: ProcessesFilters) => void;
}

export default function Filters({ filters, handleSetFilter }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const lists = useSelector((state: RootState) => state.lists);
  const [filter, setFilter] = useState(false);
  const [currentFilters, setFilters] = useState<ProcessesFilters>({
    apoderadoActual: "",
    idSiproj: 0,
    radRamaJudicialInicial: "",
    radRamaJudicialActual: "",
    demandante: "",
  });

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
      {filter ? (
        <form className={style.filterContainer} onSubmit={handleSubmit}>
          {/* APODERADO ACTUAL */}
          {user.rol === UserRol.Admin ? (
            <div className="form-floating">
              <select
                id="apoderadoActual"
                className="form-control form-control-dark"
                name="apoderadoActual"
                value={currentFilters.apoderadoActual}
                onChange={handleChange}
              >
                <option value="">Seleccionar Apoderado</option>
                {lists.apoderados.map((item) => (
                  <option key={item}>{item}</option>
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
              value={currentFilters.idSiproj}
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
              value={currentFilters.radRamaJudicialInicial}
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
              value={currentFilters.radRamaJudicialActual}
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
              value={currentFilters.demandante}
              onChange={handleChange}
            />
            <label htmlFor="demandante">Nombre del demandante</label>
          </div>

          <button className="btn btn-success" type="submit">
            Aplicar
          </button>
        </form>
      ) : null}
    </div>
  );
}
