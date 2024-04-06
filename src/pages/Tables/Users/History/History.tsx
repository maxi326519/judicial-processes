import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { History as HistoryTS } from "../../../../interfaces/history";
import { useEffect, useState } from "react";
import { getHistoryUser } from "../../../../redux/actions/history";
import { RootState } from "../../../../interfaces/RootState";
import fetDateYYYYMMDD from "../../../../functions/dateToStringInput";

import HistoryRow from "./HistoryRow/HistoryRow";
import Input from "../../../../components/Inputs/Input";

import style from "./History.module.css";

interface Props {
  onClose: () => void;
}

export default function History({ onClose }: Props) {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.history);
  const [filter, setFilter] = useState<string>(fetDateYYYYMMDD(new Date()));

  useEffect(() => {
    dispatch(openLoading());
    dispatch<any>(getHistoryUser())
      .then(() => dispatch(closeLoading()))
      .catch((error: any) => {
        console.log(error);
        dispatch(closeLoading());
      });
  }, []);

  useEffect(() => {
    setFilter(fetDateYYYYMMDD(history.date));
  }, [history.date]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!isNaN(new Date(value).getTime())) setFilter(value);
  };

  const handleSubmit = () => {
    dispatch(openLoading());
    dispatch<any>(getHistoryUser(filter))
      .then(() => dispatch(closeLoading()))
      .catch((error: any) => {
        console.log(error);
        dispatch(closeLoading());
      });
  };

  return (
    <div className={style.background}>
      <div className={`toRight ${style.window}`}>
        <div className={style.close}>
          <h3>Actuaciones</h3>
          <div className="btn-close" onClick={onClose} />
        </div>
        <div className={style.controls}>
          <Input
            name="filter"
            label="Fecha"
            type="date"
            value={filter}
            handleChange={handleChange}
          />
          <button className="btn btn-outline-primary" onClick={handleSubmit}>
            Buscar
          </button>
        </div>
        <div className={style.table}>
          <div className={`${style.row} ${style.firstRow}`}>
            <span>Usuario</span>
            <span>Inicio de sesión</span>
          </div>
          <div className={style.contentCard}>
            {history.history.length <= 0 ? (
              <div className={style.listEmpty}>
                <span>No hay Registros</span>
              </div>
            ) : (
              history.history?.map((history: HistoryTS, index: number) => (
                <HistoryRow key={index} history={history} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
