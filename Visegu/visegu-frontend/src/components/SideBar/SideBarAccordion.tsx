import { useSelector } from "react-redux";
import { UserRol } from "../../interfaces/User";

/* import list from "../../assets/svg/sideBar/list.svg";
import excel from "../../assets/svg/sideBar/excel.svg";
import graphics from "../../assets/svg/sideBar/graphics.svg"; */

import SideDropDown from "./SideDropDown/SideDropDown";
import SideItem from "./SideItem/SideItem";

import styles from "./SideBarAccordion.module.css";
import { RootState } from "../../interfaces/ReduxState";

const sideList = [
  {
    label: "Users",
    icon: "",
    path: "/dashboard/users",
    permissions: UserRol.USER,
  },
  {
    label: "Inventory",
    icon: "",
    permissions: UserRol.USER,
    subList: [
      {
        label: "Products",
        icon: "",
        path: "/dashboard/inventory/products",
      },
      {
        label: "Stock",
        icon: "",
        path: "/dashboard/inventory/stock",
      },
      {
        label: "Storages",
        icon: "",
        path: "/dashboard/inventory/storages",
      },
      {
        label: "Consult",
        icon: "",
        path: "/dashboard/inventory/consult",
      },
    ],
  },
  {
    label: "Movements",
    path: "/dashboard/movements",
    icon: "",
    permissions: UserRol.USER,
  },
];

export default function SideBarAccordion() {
  const user = useSelector((state: RootState) => state.login);

  return (
    <div className={styles.sideBar}>
      {sideList.map((item) =>
        // If user is admin
        /*         user.rol === UserRol.ADMIN || */
        // If permissions is any
        item.permissions === UserRol.USER
        && (
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
        )
      )}
    </div>
  );
}
