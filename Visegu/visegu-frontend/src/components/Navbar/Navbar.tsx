import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import swal from "sweetalert";

import styles from "./Navbar.module.css";
/* import logo from "../../assets/img/logo.png";
import userSvg from "../../assets/svg/user.svg";
import emailSvg from "../../assets/svg/menu/email.svg";
import passSvg from "../../assets/svg/menu/password.svg";
import logoutSvg from "../../assets/svg/menu/logout.svg"; */

export default function Navbar() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login);

  function handleLogout() {
    swal({
      text: "¿Quiere cerrar sesión?",
      icon: "info",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
/*       if (response === "Si")
        dispatch<any>(logOut()).then(() => redirect("/login")); */
    });
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
      </div>
      <div className={styles.userImg}>
{/*         <img src={userSvg} alt="user" /> */}
      </div>
      <div className={styles.profile}>
{/*         <div className={styles.userImg}>
          <img src={userSvg} alt="user" />
        </div> */}
        <ul className={styles.menu}>
          <li>
            <b>Perfil</b>
          </li>
          {/*           <li>{user.name}</li> */}
          <li onClick={() => redirect("/reset-email")}>
{/*             <img src={emailSvg} alt="email" /> <span>Cambiar correo</span> */}
          </li>
          <li onClick={() => redirect("/reset-password")}>
{/*             <img src={passSvg} alt="password" /> <span>Cambiar contraseña</span> */}
          </li>
          <li onClick={handleLogout}>
{/*             <img src={logoutSvg} alt="logout" /> <span>Cerrar sesion</span> */}
          </li>
        </ul>
      </div>
    </nav>
  );
}
