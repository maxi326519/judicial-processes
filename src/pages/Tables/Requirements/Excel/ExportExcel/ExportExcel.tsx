import { RequirementsDetail } from "../../../../../interfaces/Requirements/data";

import Excel from "./Excel/Excel";

import styles from "./ExportExcel.module.css";

interface Props {
  data: RequirementsDetail[];
  handleClose: () => void;
}

export default function ExportExcel({ data, handleClose }: Props) {
  return (
    <div className={styles.background}>
      <form>
        <div className={styles.close}>
          <h4>Exportar requerimientos</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        {data.length > 0 ? (
          <Excel data={data} handleClose={handleClose} />
        ) : null}
      </form>
    </div>
  );
}
