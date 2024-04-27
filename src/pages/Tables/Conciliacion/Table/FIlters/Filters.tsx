import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { useState } from "react";
import { UserRol } from "../../../../../interfaces/users";
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
