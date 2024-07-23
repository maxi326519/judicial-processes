import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { updateSystemConfig } from "../../../redux/actions/config";
import { RootState } from "../../../interfaces/RootState";
import { useState } from "react";
import swal from "sweetalert";

import styles from "./System.module.css";

export function System() {
  const dispatch = useDispatch();
  const system = useSelector((state: RootState) => state.config.system);
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (file) {
      dispatch(openLoading());
      dispatch<any>(updateSystemConfig(system, file))
        .then(() => {
          dispatch(closeLoading());
          setIsEditing(false);
          setFile(null);
        })
        .catch((error: Error) => {
          dispatch(closeLoading());
          console.log(error);
          swal("Error", "Hubo un error al actualizar la imagen", "error");
        });
    }
  }

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setIsEditing(false);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h3>Imagen de la aplicacion</h3>
        <div className={styles.preview}>
          {file ? (
            <img src={URL.createObjectURL(file)} alt="Preview" />
          ) : (
            <img src={system.logo.url} alt={system.logo.name} />
          )}
        </div>
        {isEditing ? (
          <div className={styles.edit}>
            <label>
              Seleccione una imagen
              <input type="file" name="file" onChange={handleFile} />
            </label>
            <div className={styles.btnContainer}>
              <button
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Subir
              </button>
              <button className="btn btn-outline-danger" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-outline-primary"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
