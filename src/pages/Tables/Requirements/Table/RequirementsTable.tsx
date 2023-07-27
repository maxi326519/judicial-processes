import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { getLists } from "../../../../redux/actions/Requirements/lists";
import { getLists as getReqwuirementsLists } from "../../../../redux/actions/Processes/lists";
import { UserRol } from "../../../../interfaces/users";
import { getUsers } from "../../../../redux/actions/users";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { initRequirementsHeads } from "../../../../interfaces/Requirements/data";
import {
  RequirementsHeads,
  RequirementsFilters,
  initRequirementsFilters,
} from "../../../../interfaces/Requirements/data";
import {
  deleteRequirements,
  getRequirements,
  getRequirementsDetails,
  deleteRequirementsDetails,
  clearAllRequirements,
} from "../../../../redux/actions/Requirements/requirements";
import swal from "sweetalert";

import TuelaRow from "./RequirementsRow/RequirementsRow";
import Form from "./Form/Form";
import Filters from "./FIlters/Filters";
import Lists from "../Lists/Lists";

import styles from "./RequirementsTable.module.css";
import loadingSvg from "../../../../assets/img/loading.gif";
import errorSvg from "../../../../assets/svg/error.svg";
import listSvg from "../../../../assets/svg/list.svg";

export default function RequirementsTable() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const users = useSelector((state: RootState) => state.users);
  const requirements = useSelector(
    (state: RootState) => state.requirements.heads
  );
  const [filters, setFilters] = useState<RequirementsHeads>(
    initRequirementsHeads()
  );
  const [rows, setRows] = useState<RequirementsHeads[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    if (requirements.length === 0) handleGetRequirements();
    if (users.length === 0) handleGetUsers();
  }, []);

  useEffect(() => {
    const filter = requirements.filter((data: RequirementsHeads) => {
      if (
        filters.radicadoSipa ||
        filters.tipoProceso ||
        filters.remitenteGeneral ||
        filters.remitenteEspecifico
      ) {
        /* RADICADO SIPA */
        if (
          filters.radicadoSipa &&
          !data.radicadoSipa
            .toString()
            .startsWith(filters.radicadoSipa.toString())
        )
          return false;
        /* TIPO RPOCESO */
        if (
          filters.tipoProceso &&
          !data.tipoProceso
            .toString()
            .startsWith(filters.tipoProceso.toString())
        )
          return false;

        /* REMITENTE GENERAL */
        if (
          filters.remitenteGeneral &&
          !data.remitenteGeneral
            .toString()
            .startsWith(filters.remitenteGeneral.toString())
        ) {
          return false;
        }

        /* TEMA REMITENTE ESPECIFICO */
        if (
          filters.remitenteEspecifico &&
          !data.remitenteEspecifico
            .toString()
            .startsWith(filters.remitenteEspecifico.toUpperCase())
        ) {
          return false;
        }

        return true;
      } else return true;
    });
    setRows(filter);
  }, [requirements, filters]);

  function handleGetRequirements() {
    setLoading(true);
    setError(false);

    Promise.all([
      dispatch<any>(getReqwuirementsLists()),
      dispatch<any>(getLists()),
      dispatch<any>(getRequirements(user)),
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  function handleGetUsers() {
    setLoading(true);
    setError(false);
    dispatch<any>(getUsers())
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  function handleDelete(requirements: RequirementsHeads) {
    swal({
      text: "¿Seguro que desea eliminar este requerimiento?",
      icon: "warning",
      buttons: {
        Aceptar: true,
        Cancelar: true,
      },
    }).then((response: any) => {
      console.log(response);
      if (response === "Aceptar") {
        dispatch(openLoading());
        dispatch<any>(deleteRequirements(requirements.id!))
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Eliminado",
              "Se eliminó correctamente el requerimiento",
              "success"
            );
          })
          .catch((err: any) => {
            dispatch(closeLoading());
            console.log(err);
            swal(
              "Error",
              "No se pudo eliminar este requerimiento, intentelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleClearRequirements() {
    swal({
      text: "¿Seguro que desea eliminar toda la base de datos de requerimientos?",
      icon: "warning",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      if (response === "Si") {
        dispatch(openLoading());
        dispatch<any>(clearAllRequirements())
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Eliminados",
              "Se eliminaron todas los requerimientos existentes",
              "success"
            );
          })
          .catch((error: any) => {
            console.log(error);
            dispatch(closeLoading());
            swal(
              "Error",
              "No se pudieron eliminar los requerimientos, inténtelo más tarde",
              "error"
            );
          });
      }
    });
  }

  function handleEdit(idSiproj: string) {
    dispatch(openLoading());
    dispatch<any>(getRequirementsDetails(idSiproj))
      .then(() => {
        dispatch(closeLoading());
        setForm(true);
      })
      .catch((error: any) => {
        dispatch(closeLoading());
        console.log(error);
        swal(
          "Error",
          "Hubo un error al cargar el requerimiento, intentelo mas tarde",
          "error"
        );
      });
  }

  function handleClose() {
    setForm(!form);
    if (form) {
      dispatch(deleteRequirementsDetails());
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
        <Filters filters={filters} setFilters={setFilters} />
        {user.rol === UserRol.Admin && (
          <div>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleShowList}
            >
              <img src={listSvg} alt="list" />
              <span>Listas</span>
            </button>
            <button
              className={`btn btn-outline-danger ${styles.clear}`}
              type="button"
              onClick={handleClearRequirements}
            >
              X <span>Eliminar todas los requerimientos</span>
            </button>
          </div>
        )}
        {user.rol === UserRol.Admin && (
          <div>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleClose}
              disabled={loading}
            >
              + Nuevo requerimiento
            </button>
          </div>
        )}
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.row} ${styles.firstRow}`}>
            <th>Radicado SIPA</th>
            <th>Tipo de proceso</th>
            <th>Remitente general</th>
            <th>Remitente especifico</th>
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
                <span>No se pudo cargar los requerimientos</span>
                <div>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleGetRequirements}
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
                <th>No hay requerimientos</th>
              </tr>
            ) : (
              rows?.map((requirements: RequirementsHeads) => (
                <TuelaRow
                  key={requirements.id}
                  requirements={requirements}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </tbody>
        <div className={styles.footer}>
          <span>{rows.length} Documentos</span>
        </div>
      </table>
    </div>
  );
}
