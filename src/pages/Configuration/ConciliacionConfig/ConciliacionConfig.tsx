import { updateConciliacionesConfig } from "../../../redux/actions/config";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../interfaces/RootState";
import {
  initConciliacionesConfig,
  ConciliacionesConfig as ConciliacionesConfigTS,
} from "../../../interfaces/Configuration/conciliaciones";
import swal from "sweetalert";

import Checkbox from "../../../components/Inputs/Checkbox";

import styles from "./ConciliacionConfig.module.css";
import Input from "../../../components/Inputs/Input";

interface Inputs {
  name: string;
  label: string;
}

const inputs: Inputs[] = [
  { name: "fechaIngresoSolicitud", label: "Fecha de ingreso solicitud" },
  { name: "radicadoSIPA", label: "Radicado SIPA" },
  { name: "convocante", label: "Convocante" },
  { name: "medioControl", label: "Medio de Control" },
  { name: "pretension", label: "Pretensión" },
  { name: "valorEstimado", label: "Valor estimado" },
  { name: "asignacionAbogado", label: "Asignacion abogado" },
  { name: "estadoSolicitud", label: "Estado de la solicitud" },
  { name: "terminoLegal", label: "Término legal" },
  { name: "consecutivo", label: "Consecutivo" },
  {
    name: "radicadosSIPASolicitud",
    label: "Radicados SIPA Solicitud de insumo",
  },
  {
    name: "radicadosSIPARespuesta",
    label: "Radicados SIPA Respuesta de insumo",
  },
  { name: "fechaComite", label: "Fecha de Comité" },
  { name: "desicionComite", label: "Desición de Comité" },
  { name: "estadoAudiencia", label: "Estado audiencia" },
  { name: "procuraduriaRemitente", label: "Procuraduría Remitente" },
  { name: "numeroSolicitud", label: "Número de solicitud" },
  { name: "fechaCitacionAudiencia", label: "Fecha de citación o audiencia" },
  { name: "observaciones", label: "Observaciones" },
];

export function ConciliacionesConfig() {
  const dispatch = useDispatch();
  const conciliacionesConfig = useSelector(
    (state: RootState) => state.config.conciliaciones
  );
  const [config, setConfig] = useState<ConciliacionesConfigTS>(
    initConciliacionesConfig()
  );

  useEffect(() => {
    setConfig(conciliacionesConfig);
  }, [conciliacionesConfig]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setConfig({ ...config, id: Number(event.target.value) || 0 });
  }

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const checked = event.target.checked;

    setConfig({ ...config, [name]: checked });
  }

  function handleSubmit() {
    dispatch(openLoading());
    dispatch<any>(updateConciliacionesConfig(config))
      .then(() => {
        dispatch(closeLoading());
        swal("Guardado", "Se guardó la configuración con éxito", "success");
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch(closeLoading());
        swal("Error", "No se pudo guardar la configuración", "error");
      });
  }

  return (
    <div>
      <div className={styles.id}>
        <h5>ID Automatico</h5>
        <Input
          name="id"
          label="ID"
          value={config.id}
          handleChange={handleChange}
        />
      </div>
      <div className={styles.container}>
        <h5>Obligatorios</h5>
        {inputs.map((input, i) => (
          <Checkbox
            key={i}
            name={input.name}
            label={input.label}
            value={config[input.name as keyof typeof config]}
            handleCheck={handleCheck}
          />
        ))}
      </div>
      <button
        className="btn btn-outline-success"
        type="button"
        onClick={handleSubmit}
      >
        Guardar
      </button>
    </div>
  );
}
