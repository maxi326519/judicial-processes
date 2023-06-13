import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { logOut } from "../../redux/actions/login";
import { useNavigate } from "react-router-dom";

import SideBar from "./SideBar/SideBar";
import JudicialProcessesTable from "./Tables/JudicialProcesses/JudicialProcesses";
import UsersTable from "./Tables/Users/Users";
import Iframe from "./Tables/Iframes/Iframes";
import Home from "./Tables/Home/Home";
import Excel from "./Tables/Excel/Excel";

import styles from "./Dashboard.module.css";
import userSvg from "../../assets/svg/user.svg";
import emailSvg from "../../assets/svg/menu/email.svg";
import passSvg from "../../assets/svg/menu/password.svg";
import logoutSvg from "../../assets/svg/menu/logout.svg";
import { UserRol } from "../../interfaces/users";

export default function Dashboard() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [table, setTable] = useState<number>(0);

  function changeTable(table: number) {
    setTable(table);
  }

  function handleLogout() {
    dispatch<any>(logOut());
    redirect("/login");
  }

  return (
    <div className={styles.dahsboard}>
      <SideBar table={table} changeTable={changeTable} />
      <div className={styles.container}>
        <nav>
          {
            user.rol === UserRol.Admin ? (
              <h2>
                {table === 0 ? "Tablero de control - Procesos judiciales" : null}
                {table === 1 ? "Usuarios" : null}
                {table === 2 ? "Procesos judiciales" : null}
                {table === 3 ? "Graficos" : null}
                {table === 4 ? "Excel" : null}
              </h2>
            ) : (
              <h2>
                {table === 0 ? "Tablero de control - Procesos judiciales" : null}
                {table === 1 ? "Procesos judiciales" : null}
                {table === 2 ? "Graficos" : null}
                {table === 3 ? "Excel" : null}
              </h2>
            )
          }
          <div className={styles.profile}>
            <div className={styles.userImg}>
              <img src={userSvg} alt="user" />
            </div>
            <ul className={styles.menu}>
              <li>
                <b>Perfil</b>
              </li>
              <li>{user.name}</li>
              <li>
                <img src={emailSvg} alt="email" /> <span>Cambiar correo</span>
              </li>
              <li>
                <img src={passSvg} alt="password" />{" "}
                <span>Cambiar contraseña</span>
              </li>
              <li onClick={handleLogout}>
                <img src={logoutSvg} alt="logout" /> <span>Cerrar sesion</span>
              </li>
            </ul>
          </div>
        </nav>
        {
          user.rol === UserRol.Admin ? (
            table === 0 ? <Home /> :
              table === 1 ? <UsersTable /> :
                table === 2 ? <JudicialProcessesTable /> :
                  table === 3 ? <Iframe /> :
                    table === 4 ? <Excel /> : null
          ) : (
            table === 0 ? <Home /> :
              table === 1 ? <JudicialProcessesTable /> :
                table === 2 ? <Iframe /> :
                  table === 3 ? <Excel /> : null
          )
        }
      </div>
    </div>
  );
}
