import { useDispatch, useSelector } from "react-redux";
import {
  setProcesses,
  updateProcesses,
} from "../../../../../redux/actions/judicialProcesses";
import { Timestamp } from "firebase/firestore";
import useJudicialProcesses from "../../../../../hooks/useJudicialProcesses";
import swal from "sweetalert";

import style from "./Form.module.css";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
import { useEffect } from "react";
import { RootState } from "../../../../../interfaces/RootState";
interface Props {
  handleClose: () => void;
}

export default function Form({ handleClose }: Props) {
  const dispatch = useDispatch();
  const { judicialProcesses, setJudicialProcesses } = useJudicialProcesses();
  const processesDetails = useSelector(
    (state: RootState) => state.processes.processesDetails
  );

  useEffect(() => {
    if (processesDetails) {
      setJudicialProcesses(processesDetails);
    }
  }, [processesDetails, setJudicialProcesses]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(openLoading());
    dispatch<any>(
      processesDetails
        ? updateProcesses(judicialProcesses)
        : setProcesses(judicialProcesses)
    )
      .then(() => {
        dispatch(closeLoading());
        handleClose();
        swal("Guardado", "Se guardo el proceso judicial", "success");
      })
      .catch((error: any) => {
        dispatch(closeLoading());
        console.log(error);
        swal("Error", "No se pudo guardar el proceso judicial", "error");
      });
  }

  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    if (event.target.type === "date") {
      setJudicialProcesses({
        ...judicialProcesses,
        [event.target.name]: Timestamp.fromDate(new Date(event.target.value)),
      });
    } else {
      setJudicialProcesses({
        ...judicialProcesses,
        [event.target.name]: event.target.value,
      });
    }
  }

  function handleLocalClose() {
    handleClose();
  }

  return (
    <form className={`toTop ${style.form}`} onSubmit={handleSubmit}>
      <div className={style.close}>
        <h3>Agregar inventario</h3>
        <div className="btn-close" onClick={handleLocalClose} />
      </div>
      <div className={style.grid}>
        {/* ID SIPROJ */}
        <div className="form-floating">
          <input
            id="idSiproj"
            name="idSiproj"
            className="form-control"
            type="text"
            value={judicialProcesses.idSiproj}
            onChange={handleChange}
          />
          <label htmlFor="idSiproj" className="form-label">
            ID Siproj:
          </label>
        </div>

        {/* APODERADO ACTUAL */}
        <div className="form-floating">
          <input
            id="apoderadoActual"
            name="apoderadoActual"
            className="form-control"
            type="text"
            value={judicialProcesses.apoderadoActual}
            onChange={handleChange}
          />
          <label htmlFor="apoderadoActual" className="form-label">
            Apoderado Actual:
          </label>
        </div>

        {/* APODERADO ANTERIOR */}
        <div className="form-floating">
          <input
            id="apoderadoAnterior"
            name="apoderadoAnterior"
            className="form-control"
            type="text"
            value={judicialProcesses.apoderadoAnterior}
            onChange={handleChange}
          />
          <label htmlFor="apoderadoAnterior" className="form-label">
            Apoderado Anterior:
          </label>
        </div>

        {/* PROCESO ALTO IMPACTO */}
        <div className="form-floating">
          <select
            id="procesoAltoImpacto"
            name="procesoAltoImpacto"
            className="form-select"
            value={judicialProcesses.procesoAltoImpacto}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="procesoAltoImpacto" className="form-label">
            Proceso Alto Impacto:
          </label>
        </div>

        {/* RAMA JUDICIAL INICIAL */}
        <div className="form-floating">
          <input
            id="radRamaJudicialInicial"
            name="radRamaJudicialInicial"
            className="form-control"
            type="text"
            value={judicialProcesses.radRamaJudicialInicial}
            onChange={handleChange}
          />
          <label htmlFor="radRamaJudicialInicial" className="form-label">
            Rad. Rama Judicial Inicial:
          </label>
        </div>

        {/* RAMA JUDICIAL ACTUAL */}
        <div className="form-floating">
          <input
            id="radRamaJudicialActual"
            name="radRamaJudicialActual"
            className="form-control"
            type="text"
            value={judicialProcesses.radRamaJudicialActual}
            onChange={handleChange}
          />
          <label htmlFor="radRamaJudicialActual" className="form-label">
            Rad. Rama Judicial Actual:
          </label>
        </div>

        {/* TIPO DE PROCESO: */}
        <div className="form-floating">
          <select
            id="tipoProceso"
            name="tipoProceso"
            className="form-select"
            value={judicialProcesses.tipoProceso}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="tipoProceso" className="form-label">
            Tipo de proceso:
          </label>
        </div>

        {/* DIAS TERMINOS DE CONTESTACION */}
        <div className="form-floating">
          <input
            id="diasTerminoContestacion"
            name="diasTerminoContestacion"
            className="form-control"
            type="number"
            value={judicialProcesses.diasTerminoContestacion}
            onChange={handleChange}
          />
          <label htmlFor="diasTerminoContestacion" className="form-label">
            Días términos de contestación:
          </label>
        </div>

        {/* FECHA DE NOTIFICACION DE LA DEMANDA */}
        <div className="form-floating">
          <input
            id="fechaNotificacion"
            name="fechaNotificacion"
            className="form-control"
            type="date"
            value={
              judicialProcesses.fechaNotificacion
                ?.toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaNotificacion" className="form-label">
            Fecha de notificación de la demanda:
          </label>
        </div>

        {/* FECHA DE CONTESTACION DE LA DEMANDA */}
        <div className="form-floating">
          <input
            id="fechaContestacion"
            name="fechaContestacion"
            className="form-control"
            type="date"
            value={
              judicialProcesses.fechaContestacion
                ?.toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaContestacion" className="form-label">
            Fecha de contestación de la demanda:
          </label>
        </div>

        {/* FECHA LIMITE PROBABLE DE CONTESTACION */}
        <div className="form-floating">
          <input
            id="fechaLimiteProbContestacion"
            name="fechaLimiteProbContestacion"
            className="form-control"
            type="date"
            value={
              judicialProcesses.fechaLimiteProbContestacion
                ?.toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaLimiteProbContestacion" className="form-label">
            Fecha límite de la contestación:
          </label>
        </div>

        {/* VALIDACION DE CONTESTACION */}
        <div className="form-floating">
          <input
            id="validacionContestacion"
            name="validacionContestacion"
            className="form-control"
            type="text"
            value={judicialProcesses.validacionContestacion}
            onChange={handleChange}
          />
          <label htmlFor="validacionContestacion" className="form-label">
            Validación de la contestación:
          </label>
        </div>

        {/* CALIDAD EN LA QUE ATÚA LA ENTIDAD */}
        <div className="form-floating">
          <select
            id="calidadActuacionEntidad"
            name="calidadActuacionEntidad"
            className="form-select"
            value={judicialProcesses.calidadActuacionEntidad}
            onChange={handleChange}
          >
            <option value="calidadActuacionEntidad">Seleccionar</option>
          </select>
          <label htmlFor="calidadActuacionEntidad" className="form-label">
            Calidad en al que actúa la entidad:
          </label>
        </div>

        {/* DEMANDADOS */}
        <div className="form-floating">
          <input
            id="demandados"
            name="demandados"
            className="form-control"
            type="text"
            value={judicialProcesses.demandados}
            onChange={handleChange}
          />
          <label htmlFor="demandados" className="form-label">
            Demandados:
          </label>
        </div>

        {/* ID DEL DEMANDANTE */}
        <div className="form-floating">
          <input
            id="idDemanante"
            name="idDemanante"
            className="form-control"
            type="text"
            value={judicialProcesses.idDemanante}
            onChange={handleChange}
          />
          <label htmlFor="idDemanante" className="form-label">
            ID del demandante:
          </label>
        </div>

        {/* DEMANDANTE */}
        <div className="form-floating">
          <input
            id="demandante"
            name="demandante"
            className="form-control"
            type="text"
            value={judicialProcesses.demandante}
            onChange={handleChange}
          />
          <label htmlFor="demandante" className="form-label">
            Demandante:
          </label>
        </div>

        {/* DESPACHO INICIAL */}
        <div className="form-floating">
          <input
            id="despachoInicial"
            name="despachoInicial"
            className="form-control"
            type="text"
            value={judicialProcesses.despachoInicial}
            onChange={handleChange}
          />
          <label htmlFor="despachoInicial" className="form-label">
            Despacho inicial:
          </label>
        </div>

        {/* DESPACHO ACTUAL */}
        <div className="form-floating">
          <input
            id="despachoActual"
            name="despachoActual"
            className="form-control"
            type="text"
            value={judicialProcesses.despachoActual}
            onChange={handleChange}
          />
          <label htmlFor="despachoActual" className="form-label">
            Despacho actual:
          </label>
        </div>

        {/* POSICION SDP */}
        <div className="form-floating">
          <input
            id="posicionSDP"
            name="posicionSDP"
            className="form-control"
            type="text"
            value={judicialProcesses.posicionSDP}
            onChange={handleChange}
          />
          <label htmlFor="posicionSDP" className="form-label">
            Posicion SDP:
          </label>
        </div>

        {/* TEMA GENERAL */}
        <div className="form-floating">
          <input
            id="temaGeneral"
            name="temaGeneral"
            className="form-control"
            type="text"
            value={judicialProcesses.temaGeneral}
            onChange={handleChange}
          />
          <label htmlFor="temaGeneral" className="form-label">
            Tema general:
          </label>
        </div>

        {/* PRETENSION ASUNTO */}
        <div className="form-floating">
          <input
            id="pretensionAsunto"
            name="pretensionAsunto"
            className="form-control"
            type="text"
            value={judicialProcesses.pretensionAsunto}
            onChange={handleChange}
          />
          <label htmlFor="pretensionAsunto" className="form-label">
            Pretension asunto:
          </label>
        </div>

        {/* CUANTIA ESTIMADA */}
        <div className="form-floating">
          <input
            id="cuantiaEstimada"
            name="cuantiaEstimada"
            className="form-control"
            type="text"
            value={judicialProcesses.cuantiaEstimada}
            onChange={handleChange}
          />
          <label htmlFor="cuantiaEstimada" className="form-label">
            Cuantia estimada:
          </label>
        </div>

        {/* VALOR DE LAS PRETENSIONES EN SMLVM */}
        <div className="form-floating">
          <input
            id="valorPretensionesSMLVM"
            name="valorPretensionesSMLVM"
            className="form-control"
            type="number"
            value={judicialProcesses.valorPretensionesSMLVM}
            onChange={handleChange}
          />
          <label htmlFor="valorPretensionesSMLVM" className="form-label">
            Valor de las pretesiones en SMLVM:
          </label>
        </div>

        {/* INSTANCIA DEL PROCESO */}
        <div className="form-floating">
          <select
            id="instanciaProceso"
            name="instanciaProceso"
            className="form-select"
            value={judicialProcesses.instanciaProceso}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="instanciaProceso" className="form-label">
            Instancia del proceso:
          </label>
        </div>

        {/* FECHA DEL PROCESO */}
        <div className="form-floating">
          <input
            id="fechaProceso"
            name="fechaProceso"
            className="form-control"
            type="date"
            value={
              judicialProcesses.fechaProceso
                ?.toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaProceso" className="form-label">
            Fecha del proceso:
          </label>
        </div>

        {/* ULTIMO ESTADO DEL PROCESO */}
        <div className="form-floating">
          <input
            id="ultimoEstadoProceso"
            name="ultimoEstadoProceso"
            className="form-control"
            type="text"
            value={judicialProcesses.ultimoEstadoProceso}
            onChange={handleChange}
          />
          <label htmlFor="ultimoEstadoProceso" className="form-label">
            último estado del proceso:
          </label>
        </div>

        {/* ETAPA PROCESAL */}
        <div className="form-floating">
          <select
            id="etapaProcesal"
            name="etapaProcesal"
            className="form-select"
            value={judicialProcesses.etapaProcesal}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="etapaProcesal" className="form-label">
            Etapa procesal:
          </label>
        </div>

        {/* FECHA DE FALLO DE PRIMERA INSTANCIA */}
        <div className="form-floating">
          <input
            id="fechaFalloPrimeraInstancia"
            name="fechaFalloPrimeraInstancia"
            className="form-control"
            type="date"
            value={
              judicialProcesses.fechaFalloPrimeraInstancia
                ?.toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaFalloPrimeraInstancia" className="form-label">
            Fecha de fallo de primera instancia:
          </label>
        </div>

        {/* SENTIDO DEL FALLO PRIMERA INSTANCIA */}
        <div className="form-floating">
          <select
            id="sentidoFalloPrimeraInstancia"
            name="sentidoFalloPrimeraInstancia"
            className="form-select"
            value={judicialProcesses.sentidoFalloPrimeraInstancia}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="sentidoFalloPrimeraInstancia" className="form-label">
            Sentido del fallo primera instancia:
          </label>
        </div>

        {/* RESUMEN PRIMERA INSTANCIA */}
        <div className="form-floating">
          <input
            id="resumenPrimeraInstancia"
            name="resumenPrimeraInstancia"
            className="form-control"
            type="text"
            value={judicialProcesses.resumenPrimeraInstancia}
            onChange={handleChange}
          />
          <label htmlFor="resumenPrimeraInstancia" className="form-label">
            Resumen primera instancia:
          </label>
        </div>

        {/* FECHA DE PRESENTACION DE RECURSOS */}
        <div className="form-floating">
          <input
            id="fechaPresentacionRecurso"
            name="fechaPresentacionRecurso"
            className="form-control"
            type="date"
            value={
              judicialProcesses.fechaPresentacionRecurso
                ?.toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaPresentacionRecurso" className="form-label">
            Fecha de presentacion de recursos:
          </label>
        </div>

        {/* FECHA FALLO DE SEGUNDA INSTANCIA */}
        <div className="form-floating">
          <input
            id="fechaFalloSegundaInstancia"
            name="fechaFalloSegundaInstancia"
            className="form-control"
            type="date"
            value={
              judicialProcesses.fechaFalloSegundaInstancia
                ?.toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaFalloSegundaInstancia" className="form-label">
            Fecha fallo de segunda instancia:
          </label>
        </div>

        {/* SENTIDO DE FALLO DE SEGUNDA INSTANCIA */}
        <div className="form-floating">
          <select
            id="sentidoFalloSegundaInstancia"
            name="sentidoFalloSegundaInstancia"
            className="form-select"
            value={judicialProcesses.sentidoFalloSegundaInstancia}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="sentidoFalloSegundaInstancia" className="form-label">
            Sentido de fallo de segunda instancia:
          </label>
        </div>

        {/* RESUMEN SEGUNDA INSTANCIA */}
        <div className="form-floating">
          <input
            id="resumenSegundaInstanciaL"
            name="resumenSegundaInstanciaL"
            className="form-control"
            type="text"
            value={judicialProcesses.resumenSegundaInstanciaL}
            onChange={handleChange}
          />
          <label htmlFor="resumenSegundaInstanciaL" className="form-label">
            Resumen segunda instancia:
          </label>
        </div>

        {/* INCIDENTE */}
        <div className="form-floating">
          <select
            id="incidente"
            name="incidente"
            className="form-select"
            value={judicialProcesses.incidente}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="incidente" className="form-label">
            Incidente:
          </label>
        </div>

        {/* ESTADO DEL INCIDENTE */}
        <div className="form-floating">
          <select
            id="estadoIncidente"
            name="estadoIncidente"
            className="form-select"
            value={judicialProcesses.estadoIncidente}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="estadoIncidente" className="form-label">
            Estado incidente:
          </label>
        </div>

        {/* RESUMEN DEL INCIDENTE */}
        <div className="form-floating">
          <input
            id="resumenIncidente"
            name="resumenIncidente"
            className="form-control"
            type="text"
            value={judicialProcesses.resumenIncidente}
            onChange={handleChange}
          />
          <label htmlFor="resumenIncidente" className="form-label">
            Resumen incidente:
          </label>
        </div>

        {/* OBSERVACIONES / COMENTARIOS */}
        <div className="form-floating">
          <input
            id="observaciones"
            name="observaciones"
            className="form-control"
            type="text"
            value={judicialProcesses.observaciones}
            onChange={handleChange}
          />
          <label htmlFor="observaciones" className="form-label">
            Observaciones:
          </label>
        </div>

        {/* CALIFICACION CONTINGENTE */}
        <div className="form-floating">
          <select
            id="calificacionContingente"
            name="calificacionContingente"
            className="form-select"
            value={judicialProcesses.calificacionContingente}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="calificacionContingente" className="form-label">
            Calificacion contingente:
          </label>
        </div>

        {/* ESTADO (ACTIVO O TERMINADO) */}
        <div className="form-floating">
          <select
            id="estado"
            name="estado"
            className="form-select"
            value={judicialProcesses.estado}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
          </select>
          <label htmlFor="estado" className="form-label">
            Estado:
          </label>
        </div>

        {/* FECHA DE TERMINACION */}
        <div className="form-floating">
          <input
            id="fechaTerminacion"
            name="fechaTerminacion"
            className="form-control"
            type="date"
            value={
              judicialProcesses.fechaTerminacion
                ?.toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaTerminacion" className="form-label">
            Fecha terminación:
          </label>
        </div>

        <button type="submit" className="btn btn-success">
          Agregar proceso judicial
        </button>
      </div>
    </form>
  );
}
