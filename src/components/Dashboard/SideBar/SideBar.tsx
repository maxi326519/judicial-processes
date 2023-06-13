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
];

const normalUser = [
  { name: "Home", icon: home },
  { name: "Procesos", icon: judicial },
  { name: "Graficos", icon: graphics },
  { name: "Excel", icon: excel },
];

interface Props {
  table: number;
  changeTable: (number: number) => void;
}

export default function SideBar({ table, changeTable }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [items, setItem] = useState<{ name: string, icon: string }[]>([]);

  useEffect(() => {
    if(user.rol === UserRol.Admin) {
      setItem(admin);
    }else{
      setItem(normalUser);
    }
  }, [user]);

  return (
    <div className={styles.sideBar}>
      <div className={styles.head}>
        <img src={logo} alt="logo" />
      </div>
      {items.map((item, i) => (
        <button
          key={i}
          className={table === i ? styles.selected : ""}
          type="button"
          onClick={() => changeTable(i)}
        >
          <img src={item.icon} alt="users" />
          {item.name}
        </button>
      ))}
    </div>
  );
}
