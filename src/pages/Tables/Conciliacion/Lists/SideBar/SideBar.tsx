import styles from "./SideBar.module.css";

interface Props {
  name: string;
  handleSelect: (index: number) => void;
}

const lists = [
  ["medioControl", "Medio de Control"],
  ["pretension", "Pretensión"],
  ["decisionComite", "Decisión del comité"],
  ["estadoAudiencia", "Estado de audiencia"],
  ["estadoSolicitud", "Estado de solicitud"],
  ["procuraduriaRemitente", "Procuraduría remitente"],
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
