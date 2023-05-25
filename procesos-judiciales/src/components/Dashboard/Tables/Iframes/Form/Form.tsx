import { useState } from "react";
import style from "./Form.module.css";

interface Props {
  handleClose: () => void;
  handleSubmit: (IFrame: string) => void;
}

export default function Form({ handleClose, handleSubmit }: Props) {
  const [iframe, setIFrame] = useState<string>("");

  function handlelocalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit(iframe);
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setIFrame(event.target.value);
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
          <label htmlFor="iframe">IFrame:</label>
          <textarea
            id="iframe"
            name="iframe"
            className="form-control"
            value={iframe}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-success">
            Agregar iframe
          </button>
        </div>
      </form>
    </div>
  );
}
