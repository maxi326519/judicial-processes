import { useEffect, useState } from "react";
import { RequirementsConfig as RequirementsConfiguration, initRequirementsConfig } from "../../../interfaces/configuraiton/requirements";
import { closeLoading, openLoading } from "../../../redux/actions/loading";
import { updateRequirementsConfig } from "../../../redux/actions/config";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import Checkbox from "../../../components/Inputs/Checkbox";
import { RootState } from "../../../interfaces/RootState";

interface Inputs {
    name: string;
    label: string;
}

const inputs: Inputs[] = [];

export function RequirementsConfig() {
    const dispatch = useDispatch();
    const requirementsConfig = useSelector((state: RootState) => state.config.requirements);
    const [config, setConfig] = useState<RequirementsConfiguration>(initRequirementsConfig());

    useEffect(() => {
        setConfig(requirementsConfig);
    }, [requirementsConfig])

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