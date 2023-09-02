import styles from "./SideBar.module.css";

interface Props {
  name: string;
  handleSelect: (index: number) => void;
}

const lists = [
  ["Remitente general", "remitenteGeneral"],
  ["Remitente especifico", "remitenteEspecifico"],
  ["Tipo de proceso", "tipoProceso"],
  ["Area de apoyo", "areaApoyo"],
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
