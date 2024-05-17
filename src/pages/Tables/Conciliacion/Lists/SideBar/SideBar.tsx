import styles from "./SideBar.module.css";

interface Props {
  name: string;
  handleSelect: (index: number) => void;
}

const lists = [
  ["Medio de Control", "medioControl"],
  ["Pretensión", "pretension"],
  ["Decisión del comité", "decisionComite"],
  ["Estado de audiencia", "estadoAudiencia"],
  ["Estado de solicitud", "estadoSolicitud"],
  ["Procuraduría remitente", "procuraduriaRemitente"],
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
