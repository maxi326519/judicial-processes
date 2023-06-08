import { useState } from "react";

import SideBar from "./SideBar/SideBar";
import JudicialProcessesTable from "./Tables/JudicialProcesses/JudicialProcesses";

import styles from "./Dashboard.module.css";
import UsersTable from "./Tables/Users/Users";
import Iframe from "./Tables/Iframes/Iframes";
import Home from "./Tables/Home/Home.jsx";
import Excel from "./Tables/Excel/Excel";

export default function Dashboard() {
  const [table, setTable] = useState<number>(0);

  function changeTable(table: number) {
    setTable(table);
  }

  return (
    <div className={styles.dahsboard}>
      <SideBar table={table} changeTable={changeTable} />
      <div>
        <nav>
          <h2>
            {table === 0 ? "Home" : null}
            {table === 1 ? "Usuarios" : null}
            {table === 2 ? "Procesos judiciales" : null}
            {table === 3 ? "Graficos" : null}
            {table === 4 ? "Excel" : null}
          </h2>
          <div>
            <div className={styles.userImg}>
              <img src={null} alt="user"/>
            </div>
            <ul className={styles.menu}>
              <li>Cambiar correo</li>
              <li>Cambiar contraseña</li>
              <li>Cerrar sesion</li>
            </ul>
          </div>
        </nav>
        {table === 0 ? <Home /> : null}
        {table === 1 ? <UsersTable /> : null}
        {table === 2 ? <JudicialProcessesTable /> : null}
        {table === 3 ? <Iframe /> : null}
        {table === 4 ? <Excel /> : null}
      </div>
    </div>
  );
}
