import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

import styles from "./Dashboard.module.css";

interface Props {
  element: JSX.Element;
  title: string;
}

export default function Dashboard({ element, title }: Props) {
  return (
    <div className={styles.background}>
      <Navbar title={title} />
      <SideBar />
      {element}
    </div>
  );
}
