import styles from "./SideBar.module.css";

interface Props {
  name: string;
  handleSelect: (index: number) => void;
}

const lists = [
  ["tipo", "Tipo"],
  ["temaTutela", "Tema de la tutela"],
  ["derechoVulnerado", "Derecho vulnerado"],
  ["remite", "Remite"],
  ["fallo1raInst", "Fallo primera instancia"],
  ["fallo2daInst", "Fallo segunda instancia"],
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
