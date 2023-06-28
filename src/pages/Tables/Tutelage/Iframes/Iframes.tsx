import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { useEffect, useState } from "react";
import {
  closeLoading,
  openLoading,
} from "../../../../redux/actions/loading";
import { IFrames } from "../../../../interfaces/iframes";
import {
  deleteIframe,
  getIframes,
  setIframe,
  updateIframe,
} from "../../../../redux/actions/Tutelas/iframe";
import swal from "sweetalert";

import IFramesRow from "./IFramesRow/IFramesRow";
import IFrameRenderer from "./IframeRender/IframeRender";
import Form from "./Form/Form";

import styles from "./Iframes.module.css";
import loadingGif from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";

const IFrameInput = () => {
  const dispatch = useDispatch();
  const iframes = useSelector((state: RootState) => state.tutelas.iframes);
  const [dataEdit, setDataEdit] = useState<IFrames | undefined>();
  const [dataView, setDataView] = useState<IFrames | undefined>();
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (iframes.length <= 0) {
      handleGetIFrames();
    }
  }, []);

  function handleView(iframe: IFrames | undefined) {
    setDataView(iframe);
  }

  function handleEdit(data: IFrames) {
    setDataEdit(data);
    handleClose();
  }

  function handleClose() {
    setForm(!form);
    if (form) {
      setDataEdit(undefined);
    }
  }

  function handleGetIFrames() {
    setLoading(true);
    setError(false);
    dispatch<any>(getIframes())
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  function handleSaveIFrame(IFrame: IFrames, edit: boolean) {
    dispatch(openLoading());
    dispatch<any>(edit ? updateIframe(IFrame) : setIframe(IFrame))
      .then(() => {
        dispatch(closeLoading());
        handleClose();
        swal("Guardado", "Se guardo el iframe correctamente", "success");
      })
      .catch((err: any) => {
        dispatch(closeLoading());
        swal("Error", "No se pudo guardar el iframe", "error");
        console.log(err);
      });
  }

  function handleDelete(idIframe: string) {
    swal({
      text: "¿Seguro desea eliminar este iframe?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response: any) => {
      if (response === "Si") {
        dispatch(openLoading());
        dispatch<any>(deleteIframe(idIframe))
          .then(() => {
            dispatch(closeLoading());
            swal("Eliminado", "Se elimino el iframe correctamente", "success");
          })
          .catch((err: any) => {
            dispatch(closeLoading());
            swal("Error", "No se pudo eliminar el iframe", "error");
            console.log(err);
          });
      }
    });
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? (
        <Form
          handleClose={handleClose}
          handleSubmit={handleSaveIFrame}
          data={dataEdit}
        />
      ) : null}
      {dataView ? (
        <IFrameRenderer iframe={dataView} handleClose={handleView} />
      ) : null}
      <header>
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
            <th>Nombre</th>
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
                    onClick={handleGetIFrames}
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
              iframes?.map((iframe: IFrames, i) => (
                <IFramesRow
                  key={i}
                  iframe={iframe}
                  handleEdit={handleEdit}
                  handleView={handleView}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </tbody>
      </table>
    </div>
  );
};

export default IFrameInput;
