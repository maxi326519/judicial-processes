import { useEffect, useState } from "react";
import style from "./Form.module.css";
import {
  ErrorIFrames,
  IFrames,
  initErrorIFrames,
  initIFrames,
} from "../../../../../interfaces/iframes";

interface Props {
  handleClose: () => void;
  handleSubmit: (IFrame: IFrames, edit: boolean) => void;
  data: IFrames | undefined;
}

export default function Form({ handleClose, handleSubmit, data }: Props) {
  const [iframe, setIFrame] = useState<IFrames>(initIFrames);
  const [error, setError] = useState<ErrorIFrames>(initErrorIFrames);

  useEffect(() => {
    if (data) {
      setIFrame(data);
    }
  }, [data]);

  function handlelocalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (validations()) {
      handleSubmit(iframe, data ? true : false);
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setIFrame({ ...iframe, [event.target.name]: event.target.value });
  }

  function handleLocalClose() {
    handleClose();
  }

  function validations() {
    let errors = initErrorIFrames;
    let value = true;

    if (iframe.name === "") {
      errors.name = "Debes ingresar un nombre";
      value = false;
    }
    if (iframe.data === "") {
      errors.data = "Debes ingresar un iframe";
      value = false;
    }

    setError(errors);
    return value;
  }

  return (
    <div className={style.background}>
      <form className={`toTop ${style.form}`} onSubmit={handlelocalSubmit}>
        <div className={style.close}>
          <h3>Agregar Iframe</h3>
          <div className="btn-close" onClick={handleLocalClose} />
        </div>
        <div className={style.flex}>
          {/* NAME */}
          <div className="form-floating">
            <input
              id="name"
              name="name"
              className="form-control"
              value={iframe.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Nombre:</label>
            {error.name ? <small>{error.name}</small> : null}
          </div>

          {/* IFRAME */}
          <div className="form-floating">
            <textarea
              id="data"
              name="data"
              className="form-control"
              value={iframe.data}
              onChange={handleChange}
            />
            <label htmlFor="data">IFrame:</label>
            {error.data ? <small>{error.data}</small> : null}
          </div>

          <button type="submit" className="btn btn-success">
            {data ? "Guardar iframe" : "Agregar iframe"}
          </button>
        </div>
      </form>
    </div>
  );
}
