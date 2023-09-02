import SideItem from "../SideItem/SideItem";

import styles from "./SideDropDown.module.css";
import arrowSvg from "../../../assets/svg/sideBar/arrow.svg";
import { useState } from "react";

interface Props {
  icon: string;
  label: string;
  list: Array<{
    label: string;
    icon: string;
    path: string;
  }>;
}

/**
 * Generate a drop down list with generics items for the 'SideBar'
 *
 * @param { string } icon - Url icon
 * @param { string } label - Label to show in item
 * @param { string } path - Path to use for the 'link'
 * @returns { JSX.Element } Drop down list
 */
export default function SideDropDown({ icon, label, list }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => setOpen(!open);

  return (
    <div className={`${styles.dropDown} ${open && styles.open}`}>
      <button
        className={styles.dropButton}
        type="button"
        onClick={handleToggle}
      >
        <img src={icon} alt={label} />
        <span>{label}</span>
        <img className={styles.arrow} src={arrowSvg} alt="arrow" />
      </button>
      <ul>
        {list.map((item) => (
          <li>
            <SideItem icon={item.icon} label={item.label} path={item.path} />
          </li>
        ))}
      </ul>
    </div>
  );
}
