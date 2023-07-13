import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { UserPermissions, UserRol } from "../../interfaces/users";

import home from "../../assets/svg/sideBar/home.svg";
import users from "../../assets/svg/sideBar/users.svg";
import document from "../../assets/svg/sideBar/document.svg";
import list from "../../assets/svg/sideBar/list.svg";
import excel from "../../assets/svg/sideBar/excel.svg";
import graphics from "../../assets/svg/sideBar/graphics.svg";
import config from "../../assets/svg/sideBar/configuration.svg";

import styles from "./SideBar.module.css";
import SideDropDown from "./SideDropDown/SideDropDown";
import SideItem from "./SideItem/SideItem";

const sideList = [
  {
    label: "Home",
    icon: home,
    path: "/dashboard/home/procesos",
    permissions: UserPermissions.Any,
  },
  {
    label: "Usuarios",
    icon: users,
    permissions: UserPermissions.Admin,
    path: "/dashboard/usuarios",
  },
  {
    label: "Procesos",
    icon: document,
    permissions: UserPermissions.Processes,
    subList: [
      { label: "Listado", icon: list, path: "/dashboard/procesos" },
      {
        label: "Graficos",
        icon: graphics,
        path: "/dashboard/procesos/graficos",
      },
      { label: "Excel", icon: excel, path: "/dashboard/procesos/excel" },
    ],
  },
  {
    label: "Tutelas",
    icon: document,
    permissions: UserPermissions.Tutelas,
    subList: [
      { label: "Listado", icon: list, path: "/dashboard/tutelas" },
      {
        label: "Graficos",
        icon: graphics,
        path: "/dashboard/tutelas/graficos",
      },
      { label: "Excel", icon: excel, path: "/dashboard/tutelas/excel" },
    ],
  },
  {
    label: "Requerimientos",
    icon: document,
    permissions: UserPermissions.Requirements,
    subList: [
      { label: "Listado", icon: list, path: "/dashboard/requerimientos" },
      { label: "Graficos", icon: graphics, path: "/dashboard/requerimientos" },
      { label: "Excel", icon: excel, path: "/dashboard/requerimientos" },
    ],
  },
  {
    label: "Configuracón",
    icon: config,
    permissions: UserPermissions.Admin,
    path: "/dashboard/configuracion"
  },
];

export default function SideBar() {
  const user = useSelector((state: RootState) => state.sesion);

  return (
    <div className={styles.sideBar}>
      {sideList.map((item) =>
        // If user is admin
        user.rol === UserRol.Admin ||
        // If permissions is any
        item.permissions === UserPermissions.Any ||
        // Filter items with 'Admin' permission
        (item.permissions !== UserPermissions.Admin &&
          // If is'nt admin, but has permission "processes"
          ((item.permissions === UserPermissions.Processes &&
            user.permissions.processes) ||
            // If is'nt admin, but has permission "tutelas"
            (item.permissions === UserPermissions.Tutelas &&
              user.permissions.tutelas) ||
            // If is'nt admin, but has permission "requirements"
            (item.permissions === UserPermissions.Requirements &&
              user.permissions.requirements))) ? (
          // If item has sublist
          item.subList ? (
            <SideDropDown
              icon={item.icon}
              label={item.label}
              list={item.subList}
            />
          ) : (
            <SideItem icon={item.icon} label={item.label} path={item.path} />
          )
        ) : (
          ""
        )
      )}
    </div>
  );
}
