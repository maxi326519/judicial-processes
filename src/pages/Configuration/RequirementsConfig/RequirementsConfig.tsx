import { useEffect, useState } from "react";
import { RootState } from "../../../interfaces/RootState";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { updateRequirementsConfig } from "../../../redux/actions/config";
import { useDispatch, useSelector } from "react-redux";
import {
  RequirementsConfig as RequirementsConfiguration,
  initRequirementsConfig,
} from "../../../interfaces/Configuration/requirements";
import swal from "sweetalert";

import Checkbox from "../../../components/Inputs/Checkbox";

interface Inputs {
  name: string;
  label: string;
}

const inputs: Inputs[] = [
  { name: "consecutivo", label: "Consecutivo" },
  { name: "fechaNotificacion", label: "Fecha de notificación" },
  { name: "radicadoSipa", label: "Radicado en SIPA" },
  { name: "remitenteGeneral", label: "Remitente general" },
  { name: "remitenteEspecifico", label: "Remitente específico" },
  { name: "direccion", label: "Dirección" },
  { name: "concepto", label: "Concepto" },
  { name: "tipoProceso", label: "Tipo de proceso" },
  { name: "numeroProceso", label: "Numero de proceso" },
  { name: "abogado", label: "Abogado" },
  { name: "fechaVencimiento", label: "Fecha de vencimiento" },
  { name: "solicitudDadep", label: "Solicitud Dadep" },
  { name: "areaApoyo", label: "Area de apoyo" },
  { name: "solicitudConcepto", label: "Solicitud concepto" },
  { name: "respuestaSolicitud", label: "Respuesta solicitud" },
  { name: "fechaRespuesta", label: "Fecha de respuesta" },
  { name: "respuestaSipa", label: "Respuesta SIPA" },
  { name: "estado", label: "Estado" },
  { name: "observaciones", label: "Observaciones" },
];

export function RequirementsConfig() {
  const dispatch = useDispatch();
  const requirementsConfig = useSelector(
    (state: RootState) => state.config.requirements
  );
  const [config, setConfig] = useState<RequirementsConfiguration>(
    initRequirementsConfig()
  );

  useEffect(() => {
    setConfig(requirementsConfig);
  }, [requirementsConfig]);

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const checked = event.target.checked;

    setConfig({ ...config, [name]: checked });
  }

  function handleSubmit() {
    dispatch(openLoading());
    dispatch<any>(updateRequirementsConfig(config))
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
