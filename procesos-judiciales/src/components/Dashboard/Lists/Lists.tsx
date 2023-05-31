import { useState } from "react";
import style from "./Form.module.css";
import SideBar from "../SideBar/SideBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../interfaces/RootState";
import { Users } from "../../../interfaces/users";

interface Props {
  handleClose: () => void;
  handleSubmit: (user: Users) => void;
}

const names = [
  "Departamentos",
  "Ciudades",
  "Zonas",
  "TipoDeActuación",
  "JurisdicciónAcción",
  "Pretensiones",
  "Calificaciones",
  "Etapas",
  "DetallesEtapaAnterior",
  "Instancia",
  "TipoFallos",
  "FormasTerminación",
  "LlamamientoGarantía",
  "Estados",
  "Festivos",
  "SalariosMínimos",
];

export default function Lists({ handleClose, handleSubmit }: Props) {
  const listData = useSelector((state: RootState) => state.lists);
  const [list, setList] = useState<string>("Departamentos");
  const [data, setData] = useState<Array<string>>([]);

  function handleSelect(index: number) {
    const entries = Object.entries(listData);

    // Recorrer el array hasta el índice máximo
    for (let i = 0; i <= index; i++) {
      const [key, value] = entries[i];
      console.log(`Clave: ${key}, Valor: ${value}`);
    }
  }

  return (
    <div className={style.background}>
      <div className={style.windows}>
        <header className={style.close}>
          <h3>Agregar inventario</h3>
          <div className="btn-close" onClick={handleClose} />
        </header>
        {/*         <SideBar handleSelect={handleSelect} /> */}
        {/*         <Tables list={list[list]} /> */}
      </div>
    </div>
  );
}
