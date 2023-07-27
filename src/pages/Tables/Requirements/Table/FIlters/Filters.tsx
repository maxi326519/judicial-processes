import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";
import { useState } from "react";
import {
  RequirementsFilters,
  initRequirementsFilters,
} from "../../../../../interfaces/Requirements/data";

import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/svg/filter.svg";
import Input from "../../../../../components/Inputs/Input";

interface Props {
  filters: RequirementsFilters;
  setFilters: (filters: RequirementsFilters) => void;
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
    setFilters(initRequirementsFilters());
  }

  return (
    <div className={style.filter}>
      <button className={style.btnFilter} type="button" onClick={handleFilter}>
        <span>Filtros</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      <form className={style.filterContainer}>
        <Input
          name="radicadoSipa"
          value={filters.radicadoSipa}
          label="Radicado en SIPA"
          handleChange={handleChange}
        />
        <Input
          name="tipoProceso"
          value={filters.tipoProceso}
          label="Tipo de proceso"
          handleChange={handleChange}
        />
        <Input
          name="remitenteGeneral"
          value={filters.remitenteGeneral}
          label="Remitente general"
          handleChange={handleChange}
        />
        <Input
          name="remitenteEspecifico"
          value={filters.remitenteEspecifico}
          label="Remitente especifico"
          handleChange={handleChange}
        />
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
