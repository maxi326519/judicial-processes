import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updatePoderesConfig } from "../../../redux/actions/config";
import { RootState } from "../../../interfaces/RootState";
import {
  initPoderesConfig,
  PoderesConfig as PoderesConfigTS,
} from "../../../interfaces/Configuration/poderes";
import swal from "sweetalert";

import Checkbox from "../../../components/Inputs/Checkbox";

interface Inputs {
  name: string;
  label: string;
}

const inputs: Inputs[] = [
  { name: "fechaRadicacion", label: "Fecha de radicación" },
  { name: "radicadoSipa", label: "Radicado Sipa" },
  { name: "abogado", label: "Abogado" },
  { name: "concepto", label: "Concepto" },
  { name: "proceso", label: "Proceso" },
  { name: "numero", label: "Número" },
  { name: "accionante", label: "Accionante" },
  { name: "observaciones", label: "Observaciones" },
];

export function PoderesConfig() {
  const dispatch = useDispatch();
  const poderesConfig = useSelector((state: RootState) => state.config.poderes);
  const [config, setConfig] = useState<PoderesConfigTS>(initPoderesConfig());

  useEffect(() => {
    setConfig(poderesConfig);
  }, [poderesConfig]);

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const checked = event.target.checked;

    setConfig({ ...config, [name]: checked });
  }

  function handleSubmit() {
    dispatch(openLoading());
    dispatch<any>(updatePoderesConfig(config))
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
