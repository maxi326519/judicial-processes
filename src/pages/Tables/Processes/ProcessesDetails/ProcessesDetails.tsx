import { useEffect, useState, useCallback } from "react";
import { DetalleRadicacion } from "../../../../interfaces/Processes/lists";
import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { useDispatch } from "react-redux";
import axios from "axios";

import ProcessesDetailsRow from "./ProcessesDetailsRow/ProcessesDetailsRow";

import style from "./ProcessesDetails.module.css";
import swal from "sweetalert";

interface Props {
  radicado: string;
  handleClose: () => void;
}

export default function ProcessesDetails({ radicado, handleClose }: Props) {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState({
    currentPage: 0,
    quantity: 0,
    totalRegisters: 0,
    registersPerPage: 0,
  });
  const [loadedPages, setLoadedPages] = useState<{ [key: number]: any }>({});

  const handleGetDetails = useCallback(async (page: number = 1) => {
    dispatch(openLoading());
    // Check if the page is already loaded
    if (loadedPages[page]) {
      setRows(loadedPages[page].actuaciones);
      setPage(loadedPages[page].pagination);
    } else {
      try {
        // Get the data
        const processes = await axios.get(`https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${radicado}&SoloActivos=false&pagina=1`)

        // Get de id
        const id = processes.data.procesos?.[0].idProceso;

        // If id exist
        if (id) {
          // Get details
          const details = await axios.get(`https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${id}?pagina=${page}`)

          const loadedPageData = {
            actuaciones: details.data.actuaciones,
            pagination: {
              currentPage: details.data.paginacion.pagina,
              quantity: details.data.paginacion.cantidadPaginas,
              totalRegisters: details.data.paginacion.cantidadRegistros,
              registersPerPage: details.data.paginacion.registrosPagina,
            },
          };

          // Update the local cache
          setLoadedPages((prevLoadedPages) => ({
            ...prevLoadedPages,
            [page]: loadedPageData,
          }));

          setRows(loadedPageData.actuaciones);
          setPage(loadedPageData.pagination);
        }
      } catch (error: any) {
        console.log(error);
        swal("Error", "Surgió un error al cargar las actuaciones", "error");
      }
    }
    dispatch(closeLoading());
  }, [loadedPages, radicado, dispatch]);

  useEffect(() => {
    handleGetDetails();
  }, [handleGetDetails]);

  function handlePrevPage() {
    if (page.currentPage > 1) handleGetDetails(page.currentPage - 1)
  }

  function handleNextPage() {
    if (page.currentPage < page.quantity) handleGetDetails(page.currentPage + 1)
  }

  return (
      <div className={style.background}>
      <div className={`toRight ${style.window}`}>
        <div className={style.close}>
          <h3>Actuaciones</h3>
          <div className="btn-close" onClick={() => handleClose()} />
        </div>
        <div className={style.table}>
          <div className={`${style.row} ${style.firstRow}`}>
            <span>Fecha de actuación</span>
            <span>Actuación</span>
            <span>Anotación</span>
            <span>Fecha inicia Término</span>
            <span>Fecha finaliza Término</span>
            <span>Fecha de Registro</span>
          </div>
          <div className={style.contentCard}>
            {rows.length <= 0 ? (
              <div className={style.listEmpty}>
                <span>No hay Registros</span>
              </div>
            ) : (
              rows?.map((actuacion: DetalleRadicacion) => (
                <ProcessesDetailsRow
                  key={actuacion.idRegActuacion}
                  actuacion={actuacion}
                />
              ))
            )}
          </div>
          <div className={style.pagination}>
            <span>{page.totalRegisters} Registros</span>
            <button
              disabled={page.currentPage <= 1}
              type="button"
              onClick={handlePrevPage}
            >{`<`}</button>
            <span>{`${page.currentPage} de ${page.quantity}`}</span>
            <button
              disabled={page.currentPage >= page.quantity}
              type="button"
              onClick={handleNextPage}
            >{`>`}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
