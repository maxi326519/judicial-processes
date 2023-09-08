import { Link } from "react-router-dom";

import styles from "./SideItem.module.css";

interface Props {
  icon: string;
  label: string;
  path: string;
}

/**
 * Generate a generic item for the SideBar'
 *
 * @param { string } icon - Url icon
 * @param { string } label - Label to show in item
 * @param { string } path - Path to use for the 'link'
 * @returns { JSX.Element } Link from 'react-router-dom'
 */
export default function SideItem({ icon, label, path }: Props) {
  return (
    <Link to={path} className={styles.item}>
      <img src={icon} alt={label} />
      <span>{label}</span>
    </Link>
  );
}
