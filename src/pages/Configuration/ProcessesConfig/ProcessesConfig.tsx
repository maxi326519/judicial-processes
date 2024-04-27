import { useEffect, useState } from "react";
import { ProcessesConfig as ProcessesConfiguration, initProcessesConfig } from "../../../interfaces/Configuration/processes";

import Checkbox from "../../../components/Inputs/Checkbox";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { updateProcessesConfig } from "../../../redux/actions/config";
import { RootConfig, RootState } from "../../../interfaces/RootState";

interface Inputs {
    name: string;
    label: string;
}

const inputs: Inputs[] = [
    { name: "apoderadoActual", label: "Apoderado actual" },
    { name: "apoderadoAnterior", label: "Apoderado anterior" },
    { name: "idSiproj", label: "ID Siproj" },
    { name: "procesoAltoImpacto", label: "Proceso de alto impacto" },
    { name: "radRamaJudicialInicial", label: "Rad. rama judicial inicial" },
    { name: "radRamaJudicialActual", label: "Rad. rama judicial actual" },
    { name: "tipoProceso", label: "Tipo de proceso" },
    { name: "diasTerminoContestacion", label: "Dias de término de contestación" },
    { name: "fechaNotificacion", label: "Fecha de notificación" },
    { name: "fechaAdmision", label: "Fecha de admisión" },
    { name: "fechaContestacion", label: "Fecha  de contestación" },
    { name: "fechaLimiteProbContestacion", label: "Fecha de limite probable de contestación" },
    { name: "validacionContestacion", label: "Validación de contestación" },
    { name: "calidadActuacionEntidad", label: "Calidad en la que actúa la entidad" },
    { name: "demandados", label: "Demandados" },
    { name: "idDemanante", label: "ID del demanante" },
    { name: "demandante", label: "Demandante" },
    { name: "despachoInicial", label: "Despacho inicial" },
    { name: "despachoActual", label: "Despacho actual" },
    { name: "posicionSDP", label: "Posición SDP" },
    { name: "temaGeneral", label: "Tema general" },
    { name: "pretensionAsunto", label: "Pretension asunto" },
    { name: "cuantiaEstimada", label: "Cuantía estimada" },
    { name: "valorPretensionesSMLVM", label: "Valor de las petensiones SMLVM" },
    { name: "instanciaProceso", label: "Instancia del proceso" },
    { name: "fechaProceso", label: "Fecha del proceso" },
    { name: "ultimoEstadoProceso", label: "Último estado del proceso" },
    { name: "etapaProcesal", label: "Etapa procesal" },
    { name: "fechaFalloPrimeraInstancia", label: "Fecha de fallo de la primera instancia" },
    { name: "sentidoFalloPrimeraInstancia", label: "Sentido del fallo de la primera instancia" },
    { name: "resumenPrimeraInstancia", label: "Resumen de la primera instancia" },
    { name: "fechaPresentacionRecurso", label: "Fecha de la presentación del recurso" },
    { name: "fechaFalloSegundaInstancia", label: "Fecha del fallo de la segunda instancia" },
    { name: "sentidoFalloSegundaInstancia", label: "Sentido del fallo de la segunda instancia" },
    { name: "resumenSegundaInstancia", label: "Resumen de la segunda instancia" },
    { name: "incidente", label: "Incidente" },
    { name: "estadoIncidente", label: "Estado del incidente" },
    { name: "resumenIncidente", label: "Resumen del incidente" },
    { name: "observaciones", label: "Observaciones" },
    { name: "calificacionContingente", label: "Calificación del contingente" },
    { name: "estado", label: "Estado" },
    { name: "fechaEjecutoria", label: "Fecha de ejecutoria" },
    { name: "fechaTerminacion", label: "Fecha de terminación" },
];

export function ProcessesConfig() {
    const dispatch = useDispatch();
    const processConfig = useSelector((state: RootState) => state.config.processes);
    const [config, setConfig] = useState<ProcessesConfiguration>(initProcessesConfig());

    useEffect(() => {
        setConfig(processConfig);
    }, [processConfig])

    function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const checked = event.target.checked;

        setConfig({ ...config, [name]: checked });
    }

    function handleSubmit() {
        dispatch(openLoading());
        dispatch<any>(updateProcessesConfig(config))
            .then(() => {
                dispatch(closeLoading());
                swal("Guardado", "Se guardó la configuración con éxito", "success");
            })
            .catch((error: Error) => {
                console.log(error);
                dispatch(closeLoading());
                swal("Error", "No se pudo guardar la configuración", "error");
            })
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
            <button className="btn btn-outline-success" type="button" onClick={handleSubmit}>Guardar</button>
        </div>
    )
}