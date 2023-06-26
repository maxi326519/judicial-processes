import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../interfaces/RootState";

import home from "../../../assets/svg/home.svg";
import users from "../../../assets/svg/users.svg";
import judicial from "../../../assets/svg/judicial.svg";
import excel from "../../../assets/svg/excel.svg";
import graphics from "../../../assets/svg/graphics.svg";
import logo from "../../../assets/img/logo.png";

import styles from "./SideBar.module.css";
import { UserRol } from "../../../interfaces/users";

const admin = [
  { name: "Home", icon: home },
  { name: "Users", icon: users },
  { name: "Procesos", icon: judicial },
  { name: "Graficos", icon: graphics },
  { name: "Excel", icon: excel },
  { name: "Tutelas", icon: judicial },
  { name: "Graficos", icon: graphics },
  { name: "Excel", icon: excel },
  /*   { name: "Requerimientos", icon: judicial },
  { name: "Graficos", icon: graphics },
  { name: "Excel", icon: excel }, */
];

const normalUser = [{ name: "Home", icon: home }];

interface Props {
  table: number;
  changeTable: (number: number) => void;
}

export default function SideBar({ table, changeTable }: Props) {
  const user = useSelector((state: RootState) => state.sesion);
  const [items, setItem] = useState<{ name: string; icon: string }[]>([]);

  useEffect(() => {
    if (user.rol === UserRol.Admin) {
      setItem(admin);
    } else {
      setItem(normalUser);
    }
  }, [user]);

  return (
    <div className={styles.sideBar}>
      <div className={styles.head}>
        <img src={logo} alt="logo" />
      </div>
      <button
        className={table === 0 ? styles.selected : ""}
        type="button"
        onClick={() => changeTable(0)}
      >
        <img src={home} alt="home" />
        Home
      </button>
      <button
        className={table === 1 ? styles.selected : ""}
        type="button"
        onClick={() => changeTable(1)}
      >
        <img src={users} alt="users" />
        Usuarios
      </button>

      <h5>Procesos</h5>
      <button
        className={table === 2 ? styles.selected : ""}
        type="button"
        onClick={() => changeTable(2)}
      >
        <img src={judicial} alt="judicial" />
        Processos
      </button>
      <button
        className={table === 3 ? styles.selected : ""}
        type="button"
        onClick={() => changeTable(3)}
      >
        <img src={graphics} alt="graphics" />
        Graficos
      </button>
      <button
        className={table === 4 ? styles.selected : ""}
        type="button"
        onClick={() => changeTable(4)}
      >
        <img src={excel} alt="excel" />
        Excel
      </button>

      <h5>Tutelas</h5>
      <button
        className={table === 5 ? styles.selected : ""}
        type="button"
        onClick={() => changeTable(5)}
      >
        <img src={judicial} alt="tutelas" />
        Tutelas
      </button>
      <button
        className={table === 6 ? styles.selected : ""}
        type="button"
        onClick={() => changeTable(6)}
      >
        <img src={graphics} alt="graphics" />
        Graficos
      </button>
      <button
        className={table === 7 ? styles.selected : ""}
        type="button"
        onClick={() => changeTable(7)}
      >
        <img src={excel} alt="excel" />
        Excel
      </button>
    </div>
  );
}
