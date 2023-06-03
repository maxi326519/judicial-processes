import styles from "./SideBar.module.css";

interface Props {
  handleSelect: (index: number) => void;
}

const lists = [
  "Proceso de alto impacto",
  "Tipo de proceso",
  "Calidad de actuacion de la Entidad",
  "Despacho inicial",
  "Despacho actual",
  "Posicion SDP",
  "Tema general",
  "Instancia del proceso",
  "Sentido del fallo Primera instancia",
  "Sentido del fallo Segunda instancia",
  "Incidente",
  "Estado del incidente",
  "Calificacion contingente",
  "Estado",
];

export default function SideBar({ handleSelect }: Props) {
  return (
    <div className={styles.sideBar}>
      <ul>
        {lists.map((data, i) => (
          <li>
            <button type="button" onClick={() => handleSelect(i)}>
              {data}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
