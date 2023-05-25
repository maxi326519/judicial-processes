import styles from "./SideBar.module.css";

interface Props {
  handleSelect: (index: number) => void;
}

export function SideBar({ handleSelect }: Props) {
  return (
    <div className={styles.sideBar}>
      <hr></hr>
      <h3>Listas Geograficas</h3>
      <ul>
        <li onClick={() => handleSelect(0)}>Departamentos</li>
        <li onClick={() => handleSelect(1)}>Ciudades</li>
        <li onClick={() => handleSelect(2)}>Zonas</li>
      </ul>
      <hr></hr>
      <h3>Listas Catalogo</h3>
      <ul>
        <li onClick={() => handleSelect(3)}>Tipo de actuación</li>
        <li onClick={() => handleSelect(4)}>Jurisdicción y acción</li>
        <li onClick={() => handleSelect(5)}>Pretensiones</li>
        <li onClick={() => handleSelect(6)}>Calificaciones</li>
        <li onClick={() => handleSelect(7)}>Etapas</li>
        <li onClick={() => handleSelect(8)}>Detalles etapa anterior</li>
        <li onClick={() => handleSelect(9)}>Instancia</li>
        <li onClick={() => handleSelect(10)}>Tipo fallos</li>
        <li onClick={() => handleSelect(11)}>Formas terminación</li>
        <li onClick={() => handleSelect(12)}>Llamamiento en garantía</li>
        <li onClick={() => handleSelect(13)}>Estados</li>
        <li onClick={() => handleSelect(14)}>Festivos</li>
        <li onClick={() => handleSelect(15)}>Salarios mínimos</li>
      </ul>
    </div>
  );
}
