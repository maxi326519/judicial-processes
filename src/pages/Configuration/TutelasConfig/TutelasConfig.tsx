import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateTutelasConfig } from "../../../redux/actions/config";
import { RootState } from "../../../interfaces/RootState";
import {
  TutelasConfig as TutelasConfiguration,
  initTutelasConfig,
} from "../../../interfaces/configuraiton/tutelas";
import swal from "sweetalert";

import Checkbox from "../../../components/Inputs/Checkbox";

interface Inputs {
  name: string;
  label: string;
}

const inputs: Inputs[] = [
  { name: "tipo", label: "Tipo de tutela " },
  { name: "fecha", label: "Fecha de notificacion " },
  { name: "fecha", label: "Hora de notificacion " },
  { name: "radicado", label: "Radicado SIPA " },
  { name: "abogado", label: "Abogado " },
  { name: "demandanteId", label: "Identificación del demandante " },
  { name: "demandante", label: "Demandante " },
  { name: "demandado", label: "Demandado " },
  { name: "nroTutela", label: "Nro de tutela " },
  { name: "idSiproj", label: "ID Siproj " },
  { name: "temaTutela", label: "Tema de la tutela " },
  { name: "derechoVulnerado", label: "Derecho vulnerado " },
  { name: "extranjero", label: "Extranjero " },
  { name: "concepto", label: "Concepto " },
  { name: "remite", label: "Remite o despacho judicial " },
  { name: "termino", label: "Término " },
  { name: "fechaVencimiento", label: "Fecha de vencimiento" },
  { name: "fechaVencimiento", label: "Hora de vencimiento" },
  { name: "fechaRespuesta", label: "Fecha de respuesta " },
  { name: "fechaRespuesta", label: "Hora de respuesta " },
  { name: "validacionRespuesta", label: "Validacion de la respuesta" },
  { name: "radicadoSalida", label: "Radicado de salida " },
  { name: "oficioAdicional", label: "Oficio adicional " },
  { name: "fallo1raInst", label: "Fallo de la 1ra instancia " },
  { name: "fechaFallo1raInst", label: "Fecha del fallo de la 1ra instancia " },
  {
    name: "observacionFallo1raInst",
    label: "Observación del fallo de la 1ra instancia ",
  },
  {
    name: "terminoCumplimiento1raInst",
    label: "Término de cumplimiento de la 1ra instancia ",
  },
  { name: "cumplimiento1raInst", label: "Cumplimiento de la 1ra instancia " },
  {
    name: "fechaCumplimiento1raInst",
    label: "Fecha de cumplimiento de la 1ra instancia",
  },
  { name: "impugnacionSDP", label: "Impugnacion SDP " },
  { name: "fechaImpugnacion", label: "Fecha de impugnación " },
  { name: "fallo2daInst", label: "Fallo de la 2da instancia " },
  { name: "fechaFallo2daInst", label: "Fecha de fallo de la 2da instancia " },
  {
    name: "observacionFallo2daInst",
    label: "Observación fallo de la 2da instancia ",
  },
  {
    name: "terminoCumplimiento2daInst",
    label: "Término de cumplimiento de la 2da instancia ",
  },
  { name: "cumplimiento2daInst", label: "Cumplimiento de la 2da instancia " },
  {
    name: "fechaCumplimiento2daInst",
    label: "Fecha cumplimiento de la 2da instancia",
  },
  { name: "incidenteDesacato", label: "Incidente de desacato " },
  { name: "observacionesGenerales", label: "Observaciones generales " },
];

export function TutelasConfig() {
  const dispatch = useDispatch();
  const tutelasConfig = useSelector((state: RootState) => state.config.tutelas);
  const [config, setConfig] = useState<TutelasConfiguration>(
    initTutelasConfig()
  );

  useEffect(() => {
    setConfig(tutelasConfig);
  }, [tutelasConfig]);

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const checked = event.target.checked;

    setConfig({ ...config, [name]: checked });
  }

  function handleSubmit() {
    dispatch(openLoading());
    dispatch<any>(updateTutelasConfig(config))
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
