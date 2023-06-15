import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { getLists } from "../../../../redux/actions/lists/lists";
import {
  deleteProcesses,
  deleteProcessesDetails,
  getProcesses,
  getProcessesDetails,
} from "../../../../redux/actions/judicialProcesses";
import {
  JudicialProcesses,
  ProcessesFilters,
  initProcessesFilters,
} from "../../../../interfaces/JudicialProcesses";
import swal from "sweetalert";

import JudicialProcessesRow from "./JudicialProcessesRow/JudicialProcessesRow";
import Form from "./Form/Form";
import Filters from "./FIlters/Filters";
import Lists from "../../Lists/Lists";

import styles from "./JudicialProcesses.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import listSvg from "../../../../assets/svg/list.svg";
import { UserRol } from "../../../../interfaces/users";

export default function JudicialProcessesTable() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const judicialProcesses = useSelector(
    (state: RootState) => state.processes.judicialProcesses
  );
  const [filters, setFilters] =
    useState<ProcessesFilters>(initProcessesFilters);
  const [rows, setRows] = useState<JudicialProcesses[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    if (judicialProcesses.length === 0) handleGetProcesses();
  }, []);

  useEffect(() => {
    const filter = judicialProcesses.filter((data: JudicialProcesses) => {
      if (
        filters.apoderadoActual ||
        filters.idSiproj ||
        filters.radRamaJudicialInicial ||
        filters.radRamaJudicialActual ||
        filters.demandante
      ) {
        if (
          filters.apoderadoActual &&
          filters.apoderadoActual !== data.apoderadoActual
        )
          return false;
        if (
          filters.idSiproj !== 0 &&
          Number(filters.idSiproj) !== data.idSiproj
        )
          return false;
        if (
          filters.radRamaJudicialInicial &&
          filters.radRamaJudicialInicial !== data.radRamaJudicialInicial
        ) {
          console.log(
            filters.radRamaJudicialInicial,
            data.radRamaJudicialInicial,
            filters.radRamaJudicialInicial !== data.radRamaJudicialInicial
          );
          return false;
        }

        if (
          filters.radRamaJudicialActual &&
          filters.radRamaJudicialActual !== data.radRamaJudicialActual
        )
          return false;

        console.log(
          filters.demandante,
          data.demandante,
          filters.demandante !== data.demandante,
          !data.demandante.includes(filters.demandante)
        );

        if (filters.demandante && !data.demandante.includes(filters.demandante))
          return false;
        return true;
      } else return true;
    });
    setRows(filter);
  }, [judicialProcesses, filters]);

  function handleGetProcesses() {
    setLoading(true);
    setError(false);
    dispatch<any>(getLists());
    dispatch<any>(getProcesses(user))
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  function handleDelete(processes: JudicialProcesses) {
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
        dispatch<any>(deleteProcesses(processes))
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

  function handleFilter(filters: ProcessesFilters) {
    setFilters(filters);
  }

  function handleEdit(idSiproj: string) {
    dispatch(openLoading());
    dispatch<any>(getProcessesDetails(idSiproj))
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
      dispatch(deleteProcessesDetails());
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
            <th>Rad. Proceso Judicial (INICIAL)</th>
            <th>Rad. Proceso Judicial (ACTUAL)</th>
            <th>Demandante Nombre</th>
            <th>Apoderado Actual</th>
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
                <span>No se pudo cargar los procesos</span>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleGetProcesses}
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
                <th>No hay procesos</th>
              </tr>
            ) : (
              rows?.map((judicialProcesses: JudicialProcesses) => (
                <JudicialProcessesRow
                  key={judicialProcesses.idSiproj}
                  judicialProcesses={judicialProcesses}
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
