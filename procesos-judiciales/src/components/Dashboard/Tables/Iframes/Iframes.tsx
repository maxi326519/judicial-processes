import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { useEffect, useState } from "react";
import { getIframe, setIframe } from "../../../../redux/actions/iframe";

import IFramesRow from "./IFramesRow/IFramesRow";
import Form from "./Form/Form";

import styles from "./Iframes.module.css";
import loadingGif from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import swal from "sweetalert";

const IFrameInput = () => {
  const dispatch = useDispatch();
  const iframes = useSelector((state: RootState) => state.iframes);
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    handleGetIFrames();
  }, []);

  function handleView(iframe: string) {}

  function handleClose() {
    setForm(!form);
  }

  function handleGetIFrames(){
    setLoading(true);
    setError(false);
    dispatch<any>(getIframe())
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  function handleSaveIFrame(IFrame: string) {
    dispatch<any>(setIframe(IFrame))
      .then(() => {
        swal("Guardado", "Se guardo el iframe correctamente", "success");
      })
      .catch((err: any) => {
        swal("Error", "No se pudo guardar el iframe", "error");
        console.log(err);
      });
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? (
        <Form handleClose={handleClose} handleSubmit={handleSaveIFrame} />
      ) : null}
      <header>
        <h3>IFrames</h3>
        <div className={styles.controls}>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleClose}
          >
            + Nuevo iframe
          </button>
        </div>
      </header>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.row} ${styles.firstRow}`}>
            <th>IFrame</th>
          </tr>
        </thead>
        <tbody className={styles.contentRows}>
          <div>
            {loading ? (
              <div className={styles.loading}>
                <img src={loadingGif} alt="loading" />
              </div>
            ) : null}
            {error ? (
              <div className={styles.error}>
                <img src={errorSvg} alt="error" />
                <span>No se pudo cargar los iframes</span>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleGetIframes}
                  >
                    Recargar
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => setError(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : null}
            {iframes.length <= 0 ? (
              <tr className={styles.emptyRows}>
                <th>No hay iframes</th>
              </tr>
            ) : (
              iframes?.map((user: string, i) => (
                <IFramesRow key={i} iframe={user} handleView={handleView} />
              ))
            )}
          </div>
        </tbody>
      </table>
    </div>
  );
};

export default IFrameInput;
