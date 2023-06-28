import styles from "./PageNotFound.module.css";
import errorSvg from "../../assets/svg/error-404.svg";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>¡Ops!</h1>
        <img src={errorSvg} alt="error 404" />
        <h5>
          No se encontró el recurso solicitado
          <br></br>o se encuentra en desarrollo
        </h5>
        <Link
          to="/dashboard/home"
          className="btn btn-outline-dark"
        >{`< Volver`}</Link>
      </div>
    </div>
  );
}
