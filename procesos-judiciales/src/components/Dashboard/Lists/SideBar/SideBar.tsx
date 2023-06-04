import styles from "./SideBar.module.css";

interface Props {
  name: string;
  handleSelect: (index: number) => void;
}

const lists = [
  ["Proceso de alto impacto", "procesoAltoImpacto"],
  ["Tipo de proceso", "tipoProceso"],
  ["Calidad de actuacion de la Entidad", "calidadActuacionEntidad"],
  ["Despacho inicial", "despachoInicial"],
  ["Despacho actual", "despachoActual"],
  ["Posicion SDP", "posicionSDP"],
  ["Tema general", "temaGeneral"],
  ["Instancia del proceso", "instanciaProceso"],
  ["Sentido del fallo Primera instancia", "sentidoFalloPrimeraInstancia"],
  ["Sentido del fallo Segunda instancia", "sentidoFalloSegundaInstancia"],
  ["Incidente", "incidente"],
  ["Estado del incidente", "estadoIncidente"],
  ["Calificacion contingente", "calificacionContingente"],
  ["Estado", "estado"],
];

export default function SideBar({ name, handleSelect }: Props) {
  return (
    <div className={styles.sideBar}>
      <ul>
        {lists.map((data, i) => (
          <li>
            <button
              className={name === data[1] ? styles.selected : ""}
              type="button"
              onClick={() => handleSelect(i)}
            >
              {data[0]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
