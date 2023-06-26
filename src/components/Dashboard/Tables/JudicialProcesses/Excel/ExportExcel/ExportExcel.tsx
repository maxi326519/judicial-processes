import {
  ProcessDetails,
  ProcessState,
} from "../../../../../../interfaces/Processes/data";

import Excel from "./Excel/Excel";

import styles from "./ExportExcel.module.css";

interface Props {
  data: ProcessDetails[];
  state: ProcessState | string;
  handleClose: () => void;
}

export default function ExportExcel({ data, state, handleClose }: Props) {
  return (
    <div className={styles.background}>
      <form>
        <div className={styles.close}>
          <h4>Exportar procesos</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        {data.length > 0 ? (
          <Excel data={data} state={state} handleClose={handleClose} />
        ) : null}
      </form>
    </div>
  );
}
