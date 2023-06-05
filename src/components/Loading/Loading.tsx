import loading from "../../assets/img/loading.gif";

import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <img src={loading} alt="loading" />
    </div>
  );
}