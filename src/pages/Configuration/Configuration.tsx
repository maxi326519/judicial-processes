import { closeLoading, openLoading } from "../../redux/actions/loading";
import { ConciliacionesConfig } from "./ConciliacionConfig/ConciliacionConfig";
import { useEffect, useState } from "react";
import { RequirementsConfig } from "./RequirementsConfig/RequirementsConfig";
import { ProcessesConfig } from "./ProcessesConfig/ProcessesConfig";
import { PoderesConfig } from "./PoderesConfig/PoderesConfig";
import { TutelasConfig } from "./TutelasConfig/TutelasConfig";
import { useDispatch } from "react-redux";
import {
  getTutelasConfig,
  getProcessesConfig,
  getRequirementsConfig,
  getPoderesConfig,
  getConciliacionesConfig,
} from "../../redux/actions/config";
import swal from "sweetalert";

import styles from "./Configuration.module.css";

const sideItems = [
  { label: "Procesos", value: "processes", element: <ProcessesConfig /> },
  { label: "Tutelas", value: "tutelas", element: <TutelasConfig /> },
  {
    label: "Requerimientos",
    value: "requirementes",
    element: <RequirementsConfig />,
  },
  { label: "Poderes", value: "poderes", element: <PoderesConfig /> },
  {
    label: "Conciliaciones",
    value: "conciliaciones",
    element: <ConciliacionesConfig />,
  },
];

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
      dispatch<any>(getPoderesConfig()),
      dispatch<any>(getConciliacionesConfig()),
    ])
      .then(() => {
        dispatch(closeLoading());
      })
      .catch((error: Error) => {
        console.log(error.message);
        dispatch(closeLoading());
        swal("Error", "No se pudo cargar la configuración", "error");
      });
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
        {sideItems.map((item) => (
          <button
            key={item.value}
            className={selected === item.value ? styles.selected : ""}
            onClick={() => handleSelected(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.content}>{element}</div>
    </div>
  );
}
