import { useState } from "react";

import SideBar from "./SideBar/SideBar";
import Tables from "./Tables/Tables";
import Loading from "../../../../components/Loading/Loading";

import style from "./Lists.module.css";

interface Props {
  handleClose: () => void;
}

const lists = [
  "remitenteGeneral",
  "remitenteEspecifico",
  "tipoProceso",
  "areaApoyo",
  "estado",
];

export default function Lists({ handleClose }: Props) {
  const [name, setName] = useState<string>(lists[0]);
  const [loading, setLoading] = useState(false);

  function handleSelect(index: number) {
    setName(lists[index]);
  }

  function handleOpenLoading() {
    setLoading(true);
  }

  function handleCloseLoading() {
    setLoading(false);
  }

  return (
    <div className={style.background}>
      <div className={style.windows}>
        {loading ? <Loading /> : null}
        <header className={style.close}>
          <h3>Listas</h3>
          <div className="btn-close" onClick={handleClose} />
        </header>
        <div className={style.container}>
          <SideBar name={name} handleSelect={handleSelect} />
          <Tables
            name={name}
            handleOpenLoading={handleOpenLoading}
            handleCloseLoading={handleCloseLoading}
          />
        </div>
      </div>
    </div>
  );
}
