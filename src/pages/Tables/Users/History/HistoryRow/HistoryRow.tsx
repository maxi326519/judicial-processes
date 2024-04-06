import { History } from "../../../../../interfaces/history";

import style from "./HistoryRow.module.css";

interface Props {
  history: History;
}

export default function HistoryRow({ history }: Props) {
  return (
    <div className={style.row}>
      <span>{history.user.name}</span>
      <span>{history.ingress}</span>
    </div>
  );
}
