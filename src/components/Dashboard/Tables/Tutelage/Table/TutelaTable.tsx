import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
import { getLists } from "../../../../../redux/actions/Tutelas/lists";
import { UserRol } from "../../../../../interfaces/users";
import {
  deleteTutela,
  getTutelas,
  getTutelaDetails,
  deleteTutelaDetails,
} from "../../../../../redux/actions/Tutelas/tutelas";
import {
  TutelaHeads,
  TutelaFilters,
  initTutelaFilters,
} from "../../../../../interfaces/Tutelas/data";
import swal from "sweetalert";

import TuelaRow from "./TutelaRow/TutelaRow";
import Form from "./Form/Form";
import Filters from "./FIlters/Filters";
import Lists from "../Lists/Lists";

import styles from "./TutelaTable.module.css";
import loadingSvg from "../../../../../assets/img/loading.gif";
import errorSvg from "../../../../../assets/svg/error.svg";
import listSvg from "../../../../../assets/svg/list.svg";

export default function TutelaTable() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const tutela = useSelector((state: RootState) => state.tutelas.heads);
  const [filters, setFilters] = useState<TutelaFilters>(initTutelaFilters);
  const [rows, setRows] = useState<TutelaHeads[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    if (tutela.length === 0) handleGetTutelas();
  }, []);

  useEffect(() => {
    const filter = tutela.filter((data: TutelaHeads) => {
      if (
        filters.idSiproj ||
        filters.nroTutela ||
        filters.demandanteId ||
        filters.demandante
      ) {
        if (
          data.idSiproj
            .toString()
            .toLowerCase()
            .includes(filters.idSiproj.toString())
        )
          return false;
        if (
          data.nroTutela.toLowerCase().includes(filters.nroTutela.toLowerCase())
        )
          return false;
        if (
          data.demandanteId
            .toLowerCase()
            .includes(filters.demandanteId.toLowerCase())
        ) {
          return false;
        }

        if (
          data.demandante
            .toLowerCase()
            .includes(filters.demandante.toLowerCase())
        )
          return false;

        if (
          filters.demandante &&
          !data.demandante.includes(filters.demandante.toLowerCase())
        )
          return false;
        return true;
      } else return true;
    });
    setRows(filter);
  }, [tutela, filters]);

  function handleGetTutelas() {
    setLoading(true);
    setError(false);
    Promise.all([dispatch<any>(getLists()), dispatch<any>(getTutelas(user))])
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  function handleDelete(processes: TutelaHeads) {
    swal({
      text: "¿Seguro que desea eliminar este proceso?",
      icon: "warning",
      buttons: {
        Aceptar: true,
        Cancelar: true,
      },
    }).then((response: any) => {
      console.log(response);
      if (response === "Aceptar") {
        dispatch(openLoading());
        dispatch<any>(deleteTutela(processes.idSiproj))
          .then(() => {
            dispatch(closeLoading());
            swal("Eliminado", "Se eliminó correctamente el proceso", "success");
          })
          .catch((err: any) => {
            dispatch(closeLoading());
            console.log(err);
            swal(
              "Error",
              "No se pudo eliminar este proceso, intentelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleFilter(filters: TutelaFilters) {
    setFilters(filters);
  }

  function handleEdit(idSiproj: string) {
    dispatch(openLoading());
    dispatch<any>(getTutelaDetails(idSiproj))
      .then(() => {
        dispatch(closeLoading());
        setForm(true);
      })
      .catch((error: any) => {
        dispatch(closeLoading());
        console.log(error);
        swal(
          "Error",
          "Hubo un error al cargar el proceso, intentelo mas tarde",
          "error"
        );
      });
  }

  function handleClose() {
    setForm(!form);
    if (form) {
      dispatch(deleteTutelaDetails());
    }
  }

  function handleShowList() {
    setList(!list);
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form ? <Form handleClose={handleClose} /> : null}
      {list ? <Lists handleClose={handleShowList} /> : null}
      <div className={styles.controls}>
        <Filters filters={filters} handleSetFilter={handleFilter} />
        {user.rol === UserRol.Admin ? (
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleShowList}
          >
            <img src={listSvg} alt="list" />
            <span>Listas</span>
          </button>
        ) : null}
        <div>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleClose}
          >
            + Nuevo Proceso
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.row} ${styles.firstRow}`}>
            <th>ID Siproj</th>
            <th>Nro de tutela</th>
            <th>abogado</th>
            <th>ID Demandante</th>
            <th>Demandante</th>
          </tr>
        </thead>
        <tbody className={styles.contentRows}>
          <div>
            {loading ? (
              <div className={styles.loading}>
                <img src={loadingSvg} alt="loading" />
              </div>
            ) : null}
            {error ? (
              <div className={styles.error}>
                <img src={errorSvg} alt="error" />
                <span>No se pudo cargar las tutelas</span>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleGetTutelas}
                  >
                    Recargar
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => setError(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : null}
            {rows.length <= 0 ? (
              <tr className={styles.emptyRows}>
                <th>No hay tutelas</th>
              </tr>
            ) : (
              rows?.map((tutela: TutelaHeads) => (
                <TuelaRow
                  key={tutela.idSiproj}
                  tutela={tutela}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </tbody>
      </table>
    </div>
  );
}
