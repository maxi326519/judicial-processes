import { useState } from "react";

import SideBar from "./SideBar/SideBar";
import Tables from "./Tables/Tables";

import style from "./Lists.module.css";

interface Props {
  handleClose: () => void;
}

const lists = [
  "procesoAltoImpacto",
  "tipoProceso",
  "calidadActuacionEntidad",
  "despachoInicial",
  "despachoActual",
  "posicionSDP",
  "temaGeneral",
  "instanciaProceso",
  "sentidoFalloPrimeraInstancia",
  "sentidoFalloSegundaInstancia",
  "incidente",
  "estadoIncidente",
  "calificacionContingente",
  "estado",
];

export default function Lists({ handleClose }: Props) {
  const [name, setName] = useState<string>(lists[0]);

  function handleSelect(index: number) {
    setName(lists[index]);
  }

  return (
    <div className={style.background}>
      <div className={style.windows}>
        <header className={style.close}>
          <h3>Listas</h3>
          <div className="btn-close" onClick={handleClose} />
        </header>
        <div className={style.container}>
          <SideBar name={name} handleSelect={handleSelect} />
          <Tables name={name} />
        </div>
      </div>
    </div>
  );
}
