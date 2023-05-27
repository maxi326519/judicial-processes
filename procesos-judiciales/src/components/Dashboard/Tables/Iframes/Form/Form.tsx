import { useEffect, useState } from "react";
import style from "./Form.module.css";
import { IFrames, initIFrames } from "../../../../../interfaces/iframes";

interface Props {
  handleClose: () => void;
  handleSubmit: (IFrame: IFrames, edit: boolean) => void;
  data: IFrames | undefined;
}

export default function Form({ handleClose, handleSubmit, data }: Props) {
  const [iframe, setIFrame] = useState<IFrames>(initIFrames);

  useEffect(() => {
    if (data) {
      setIFrame(data);
    }
  }, []);

  function handlelocalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit(iframe, data ? true : false);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setIFrame({ ...iframe, [event.target.name]: event.target.value });
  }

  function handleLocalClose() {
    handleClose();
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
          </div>
          <button type="submit" className="btn btn-success">
            Agregar iframe
          </button>
        </div>
      </form>
    </div>
  );
}
