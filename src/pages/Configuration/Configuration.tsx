import { useEffect, useState } from "react";
import { ProcessesConfig } from "./ProcessesConfig/ProcessesConfig"
import { RequirementsConfig } from "./RequirementsConfig/RequirementsConfig"
import { TutelasConfig } from "./TutelasConfig/TutelasConfig"

import styles from "./Configuration.module.css";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "../../redux/actions/loading";
import { getProcessesConfig, getRequirementsConfig, getTutelasConfig } from "../../redux/actions/config";
import swal from "sweetalert";

const sideItems = [
    { label: "Procesos", value: "processes", element: <ProcessesConfig /> },
    { label: "Tutelas", value: "tutelas", element: <TutelasConfig /> },
    { label: "Requerimientos", value: "requirementes", element: <RequirementsConfig /> },
]

export function Configuration() {
    const dispatch = useDispatch();
    const [element, setElement] = useState<JSX.Element>(sideItems[0].element);
    const [selected, setSelected] = useState<string>(sideItems[0].value);

    useEffect(() => {
        dispatch(openLoading());
        Promise.all([
            dispatch<any>(getProcessesConfig()),
            dispatch<any>(getTutelasConfig()),
            dispatch<any>(getRequirementsConfig()),
        ])
            .then(() => {
                dispatch(closeLoading());
            })
            .catch((error: Error) => {
                console.log(error.message);
                dispatch(closeLoading());
                swal("Error", "No se pudo cargar la configuración", "error")
            })
    }, [dispatch]);

    function handleSelected(value: string) {
        const itemSelected = sideItems.find((item) => item.value === value);
        if (itemSelected) {
            setElement(itemSelected.element);
            setSelected(itemSelected.value);
        }
    }

    return (
        <div className={styles.config}>
            <div className={styles.menu}>
                {
                    sideItems.map((item) => (
                        <button
                            key={item.value}
                            className={selected === item.value ? styles.selected : ""}
                            onClick={() => handleSelected(item.value)}
                        >
                            {item.label}
                        </button>
                    ))
                }
            </div>
            <div className={styles.content}>
                {element}
            </div>
        </div>
    )
}