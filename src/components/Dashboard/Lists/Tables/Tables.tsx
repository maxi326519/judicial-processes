import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { Lists } from "../../../../interfaces/JudicialProcesses";
import { deleteItem, setItem } from "../../../../redux/actions/lists/lists";

import styles from "./Tables.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import swal from "sweetalert";

interface Props {
  name: string;
}

interface Cache {
  new: string[];
  deleted: string[];
}

const initCache: Cache = {
  new: [],
  deleted: [],
};

export default function Tables({ name }: Props) {
  const dispatch = useDispatch();
  const lists: Lists = useSelector((state: RootState) => state.lists);
  const [newData, setNewData] = useState<any>("");
  const [cache, setCache] = useState<Cache>(initCache);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCache(initCache);
    for (let item in lists) {
      if (item === name) {
        setData(lists[item as keyof typeof lists]);
      }
    }
  }, [name, setData, lists]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cache.new.length > 0 || cache.deleted.length > 0) setLoading(true);
    if (cache.new.length > 0) {
      dispatch<any>(setItem(name, cache.new))
        .then(() => {
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
          console.log(error);
          swal("Error", "No se pudo actualizar los datos", "error");
        });
    }
    if (cache.deleted.length > 0) {
      dispatch<any>(deleteItem(name, cache.deleted))
        .then(() => {
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
          console.log(error);
          swal("Error", "No se pudo actualizar los datos", "error");
        });
    }
    setCache(initCache);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (name === "tipoProceso" || name === "salariosMinimos") {
      setNewData({ ...newData, [event.target.name]: event.target.value });
    } else {
      setNewData(event.target.value);
    }
  }

  function handleAdd() {
    if (name === "diasFestivos") {
      setData([...data, changeDateFormat(newData)]);
    } else {
      setData([...data, newData]);
    }
    setCache({ ...cache, new: [...cache.new, newData] });
    setNewData("");
  }

  function handleRemove(item: string) {
    setData(data.filter((itemData: string) => itemData !== item));
    if (cache.new.some((cache) => cache === item)) {
      setCache({
        ...cache,
        new: cache.new.filter((cache: string) => cache !== item),
      });
    } else {
      setCache({ ...cache, deleted: [...cache.deleted, item] });
    }
  }

  function changeDateFormat(value: string) {
    const date = value.split("-");
    const newFormat = `${date[2]}/${date[1]}/${date[0]}`;
    return newFormat;
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.categoriesList}>
        {loading ? (
          <div className={styles.loading}>
            <img src={loadingSvg} alt="loading" />
          </div>
        ) : null}
        {data.length > 0 ? (
          name === "tipoProceso" ? (
            data.map((data, index) => (
              <div
                key={index}
                className={`${styles.row} ${styles.tipoProceso}`}
              >
                <span>{data?.tipo}</span>
                <span>{data?.dias}</span>
                <div
                  className="btn btn-close"
                  onClick={() => handleRemove(data)}
                />
              </div>
            ))
          ) : name === "salariosMinimos" ? (
            data.map((data, index) => (
              <div key={index} className={styles.row}>
                <span>{data.fecha}</span>
                <span>{data.salario}</span>
                <div
                  className="btn btn-close"
                  onClick={() => handleRemove(data)}
                />
              </div>
            ))
          ) : (
            data.map((data, index) => (
              <div key={index} className={styles.row}>
                <span>{typeof data === "string" ? data : ""}</span>
                <div
                  className="btn btn-close"
                  onClick={() => handleRemove(data)}
                />
              </div>
            ))
          )
        ) : (
          <span className={styles.empty}>Empty</span>
        )}
      </div>
      <div>
        <div className={styles.formContainer}>
          {name === "diasFestivos" ? (
            <input
              className="form-control"
              id="fecha"
              type="date"
              placeholder="Fecha"
              value={newData}
              onChange={handleChange}
            />
          ) : name === "tipoProceso" ? (
            <div className={styles.inputs}>
              <input
                className="form-control"
                id="tipo"
                name="tipo"
                type="text"
                placeholder="Tipo"
                value={newData?.tipo || ""}
                onChange={handleChange}
              />
              <input
                className="form-control"
                id="dias"
                name="dias"
                type="number"
                placeholder="Dias"
                value={newData?.dias || ""}
                onChange={handleChange}
              />
            </div>
          ) : name === "salariosMinimos" ? (
            <div className={styles.inputs}>
              <input
                className="form-control"
                id="fecha"
                name="fecha"
                type="number"
                placeholder="Año"
                value={newData?.fecha || ""}
                onChange={handleChange}
              />
              <input
                className="form-control"
                id="salario"
                name="salario"
                type="number"
                placeholder="Salario"
                value={newData?.salario || ""}
                onChange={handleChange}
              />
            </div>
          ) : (
            <input
              className="form-control"
              id="add"
              type="text"
              placeholder="Datos"
              value={newData}
              onChange={handleChange}
            />
          )}
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-outline-primary"
          type="submit"
          disabled={cache.new.length <= 0 && cache.deleted.length <= 0}
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
