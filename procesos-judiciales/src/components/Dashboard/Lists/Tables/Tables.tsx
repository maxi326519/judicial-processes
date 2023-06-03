import { useState, useEffect } from "react";

import styles from "./Tables.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { Lists } from "../../../../interfaces/JudicialProcesses";

interface Props {
  name: string;
}

export default function Tables({ name }: Props) {
  const lists: Lists = useSelector((state: RootState) => state.lists);
  const [newData, setNewData] = useState<string>("");
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    for(let item in lists){
      console.log(item);
    }
  }, [name]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewData(event.target.value);
  }

  function handleAdd() {}

  function handleRemove(data: string) {}

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.categoriesList}>
        {data.length > 0 ? (
          data.map((data, index) => (
            <div key={index} className={styles.row}>
              <span>{data}</span>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => handleRemove(data)}
              >
                -
              </button>
            </div>
          ))
        ) : (
          <span className={styles.empty}>Empty</span>
        )}
      </div>
      <div>
        <div className={styles.formContainer}>
          <label htmlFor="add">.</label>
          <input
            className="form-control"
            id="add"
            type="text"
            value={newData}
            onChange={handleChange}
          />
          <button className="btn btn-outline-success" type="button" onClick={handleAdd}>
            +
          </button>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Guardar
        </button>
      </div>
    </form>
  );
}
