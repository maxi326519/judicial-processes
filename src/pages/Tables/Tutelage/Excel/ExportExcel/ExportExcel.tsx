import { TutelaDetails } from "../../../../../interfaces/Tutelas/data";

import Excel from "./Excel/Excel";

import styles from "./ExportExcel.module.css";

interface Props {
  data: TutelaDetails[];
  handleClose: () => void;
}

export default function ExportExcel({ data, handleClose }: Props) {
  return (
    <div className={styles.background}>
      <form>
        <div className={styles.close}>
          <h4>Exportar procesos</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        {data.length > 0 ? (
          <Excel data={data} handleClose={handleClose} />
        ) : null}
      </form>
    </div>
  );
}
