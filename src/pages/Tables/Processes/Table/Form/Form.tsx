import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { UserRol } from "../../../../../interfaces/users";
import {
  setProcesses,
  updateProcesses,
} from "../../../../../redux/actions/Processes/processes";
import {
  closeLoading,
  openLoading,
} from "../../../../../redux/actions/loading";
import useJudicialProcesses from "../../../../../hooks/Processes/useProcesses";
import swal from "sweetalert";

import styles from "./Form.module.css";

interface Props {
  handleClose: () => void;
}

export default function Form({ handleClose }: Props) {
  const user = useSelector((state: RootState) => state.sesion);
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const {
    judicialProcesses,
    errors,
    validations,
    reset,
    setJudicialProcesses,
    setErrors,
  } = useJudicialProcesses();
  const processesDetails = useSelector(
    (state: RootState) => state.processes.details
  );
  const lists = useSelector((state: RootState) => state.processes.lists);
  const [errorLength, setErrorLength] = useState<number>(0);

  useEffect(() => {
    return () => {
      reset();
      handleClose();
    };
  }, []);

  useEffect(() => {
    let acumulator = 0;
    for (const property in errors) {
      if (errors[property as keyof typeof errors] !== "") {
        acumulator++;
      }
    }
    setErrorLength(acumulator);
  }, [errors]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validations()) {
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
          console.log(error);
          dispatch(closeLoading());
          if (error.message.includes("Ya existe el id")) {
            setErrors({ ...errors, idSiproj: "Ya existe este id" });
          } else {
            swal("Error", "No se pudo guardar el proceso judicial", "error");
          }
        });
    }
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setJudicialProcesses(event);
  }

  function handleLocalClose() {
    handleClose();
  }

  return (
    <form className={`toTop ${styles.form}`} onSubmit={handleSubmit}>
      <div className={styles.close}>
        <h3>Agregar proceso</h3>
        <div className="btn-close" onClick={handleLocalClose} />
      </div>
      <div className={styles.grid}>
        {/* ID SIPROJ */}
        <div className="form-floating">
          <input
            id="idSiproj"
            name="idSiproj"
            className={`form-control ${errors.idSiproj ? "is-invalid" : ""}`}
            type="number"
            value={judicialProcesses.idSiproj}
            onChange={handleChange}
            disabled={processesDetails ? true : false}
          />
          <label htmlFor="idSiproj" className="form-label">
            ID Siproj:
          </label>
          <small>{errors.idSiproj}</small>
        </div>

        {/* APODERADO ACTUAL */}
        <div className="form-floating">
          <select
            id="apoderadoActual"
            name="apoderadoActual"
            className={`form-select ${!errors.apoderadoActual ? "" : "is-invalid"
              }`}
            value={judicialProcesses.apoderadoActual}
            onChange={handleChange}
            disabled={user.rol === UserRol.User}
          >
            <option value="">Seleccionar</option>
            {users
              .filter(
                (user) =>
                  user.id !== "2RuL7ejyY7ftgEAL4j7jy2RyOXQ2" && // Filter one user
                  user.permissions?.processes && // Filter only they have access
                  user.rol !== UserRol.Admin && // Filter the admins
                  !(
                    user.available && // If available exist
                    user.available.startDate! <= new Date() && // If the date is within the range
                    user.available.endDate! >= new Date()
                  )
              )
              .map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
          </select>
          <label htmlFor="apoderadoActual" className="form-label">
            Apoderado Actual:
          </label>
          <small>{errors.apoderadoActual}</small>
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
            {lists.procesoAltoImpacto.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
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
            className={`form-control ${!errors.radRamaJudicialInicial ? "" : "is-invalid"
              }`}
            type="text"
            value={judicialProcesses.radRamaJudicialInicial}
            onChange={handleChange}
          />
          <label htmlFor="radRamaJudicialInicial" className="form-label">
            Rad. Rama Judicial Inicial:
          </label>
          <small>{errors.radRamaJudicialInicial}</small>
        </div>

        {/* RAMA JUDICIAL ACTUAL */}
        <div className="form-floating">
          <input
            id="radRamaJudicialActual"
            name="radRamaJudicialActual"
            className={`form-control ${!errors.radRamaJudicialActual ? "" : "is-invalid"
              }`}
            type="text"
            value={judicialProcesses.radRamaJudicialActual}
            onChange={handleChange}
          />
          <label htmlFor="radRamaJudicialActual" className="form-label">
            Rad. Rama Judicial Actual:
          </label>
          <small>{errors.radRamaJudicialActual}</small>
        </div>

        <div className={styles.typesInputs}>
          {/* TIPO DE PROCESO: */}
          <div className="form-floating">
            <select
              id="tipoProceso"
              name="tipoProceso"
              className={`form-select ${errors.tipoProceso ? "is-invalid" : ""
                }`}
              value={judicialProcesses.tipoProceso}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              {lists.tipoProceso.map((item, i) => (
                <option key={i} value={item.tipo}>
                  {item.tipo}
                </option>
              ))}
            </select>
            <label htmlFor="tipoProceso" className="form-label">
              Tipo de proceso:
            </label>
            <small>{errors.tipoProceso}</small>
          </div>

          {/* DIAS TERMINOS DE CONTESTACION */}
          <div className="form-floating">
            <input
              id="diasTerminoContestacion"
              name="diasTerminoContestacion"
              className={`form-control ${styles.formuladas}`}
              type="number"
              value={judicialProcesses.diasTerminoContestacion}
              disabled={true}
            />
            <label htmlFor="diasTerminoContestacion" className="form-label">
              Días términos de contestación:
            </label>
          </div>
        </div>

        {/* FECHA DE NOTIFICACION DE LA DEMANDA */}
        <div className="form-floating">
          <input
            id="fechaNotificacion"
            name="fechaNotificacion"
            className={`form-control ${!errors.fechaNotificacion ? "" : "is-invalid"
              }`}
            type="date"
            value={
              judicialProcesses.fechaNotificacion?.toISOString()?.split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaNotificacion" className="form-label">
            Fecha de notificación de la demanda:
          </label>
          <small>{errors.fechaNotificacion}</small>
        </div>

        {/* FECHA DE ADMISION */}
        <div className="form-floating">
          <input
            id="fechaAdmision"
            name="fechaAdmision"
            className="form-control"
            type="date"
            value={judicialProcesses.fechaAdmision?.toISOString().split("T")[0]}
            onChange={handleChange}
          />
          <label htmlFor="fechaAdmision" className="form-label">
            Fecha de admision:
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
              judicialProcesses.fechaContestacion?.toISOString().split("T")[0]
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
            className={`form-control ${styles.formuladas}`}
            type="date"
            value={
              judicialProcesses.fechaLimiteProbContestacion
                ?.toISOString()
                .split("T")[0]
            }
            disabled={true}
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
            className={`form-control ${styles.formuladas}`}
            type="text"
            value={judicialProcesses.validacionContestacion}
            disabled={true}
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
            className={`form-select ${!errors.calidadActuacionEntidad ? "" : "is-invalid"
              }`}
            value={judicialProcesses.calidadActuacionEntidad}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            {lists.calidadActuacionEntidad.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="calidadActuacionEntidad" className="form-label">
            Calidad en al que actúa la entidad:
          </label>
          <small>{errors.calidadActuacionEntidad}</small>
        </div>

        {/* DEMANDADOS */}
        <div className="form-floating">
          <input
            id="demandados"
            name="demandados"
            className={`form-control ${errors.demandados ? "is-invalid" : ""}`}
            type="text"
            value={judicialProcesses.demandados}
            onChange={handleChange}
          />
          <label htmlFor="demandados" className="form-label">
            Demandados:
          </label>
          <small>{errors.demandados}</small>
        </div>

        {/* ID DEL DEMANDANTE */}
        <div className="form-floating">
          <input
            id="idDemanante"
            name="idDemanante"
            className={`form-control ${!errors.idDemanante ? "" : "is-invalid"
              }`}
            type="text"
            value={judicialProcesses.idDemanante}
            onChange={handleChange}
          />
          <label htmlFor="idDemanante" className="form-label">
            ID del demandante:
          </label>
          <small>{errors.idDemanante}</small>
        </div>

        {/* DEMANDANTE */}
        <div className="form-floating">
          <input
            id="demandante"
            name="demandante"
            className={`form-control ${errors.demandante ? "is-invalid" : ""}`}
            type="text"
            value={judicialProcesses.demandante}
            onChange={handleChange}
          />
          <label htmlFor="demandante" className="form-label">
            Demandante:
          </label>
          <small>{errors.demandante}</small>
        </div>

        {/* DESPACHO INICIAL */}
        <div className="form-floating">
          <select
            id="despachoInicial"
            name="despachoInicial"
            className={`form-select ${!errors.despachoInicial ? "" : "is-invalid"
              }`}
            value={judicialProcesses.despachoInicial}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            {lists.despachoInicial.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="despachoInicial" className="form-label">
            Despacho inicial:
          </label>
          <small>{errors.despachoInicial}</small>
        </div>

        {/* DESPACHO ACTUAL */}
        <div className="form-floating">
          <select
            id="despachoActual"
            name="despachoActual"
            className={`form-select ${!errors.despachoActual ? "" : "is-invalid"
              }`}
            value={judicialProcesses.despachoActual}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            {lists.despachoActual.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="despachoActual" className="form-label">
            Despacho actual:
          </label>
          <small>{errors.despachoActual}</small>
        </div>

        {/* POSICION SDP */}
        <div className="form-floating">
          <select
            id="posicionSDP"
            name="posicionSDP"
            className="form-select"
            value={judicialProcesses.posicionSDP}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            {lists.posicionSDP.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="posicionSDP" className="form-label">
            Posicion SDP:
          </label>
        </div>

        {/* TEMA GENERAL */}
        <div className="form-floating">
          <select
            id="temaGeneral"
            name="temaGeneral"
            className={`form-select ${!errors.temaGeneral ? "" : "is-invalid"}`}
            value={judicialProcesses.temaGeneral}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            {lists.temaGeneral.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="temaGeneral" className="form-label">
            Tema general:
          </label>
          <small>{errors.temaGeneral}</small>
        </div>

        {/* CUANTIA ESTIMADA */}
        <div className="form-floating">
          <input
            id="cuantiaEstimada"
            name="cuantiaEstimada"
            className={`form-control ${!errors.cuantiaEstimada ? "" : "is-invalid"
              }`}
            type="number"
            value={judicialProcesses.cuantiaEstimada}
            onChange={handleChange}
          />
          <label htmlFor="cuantiaEstimada" className="form-label">
            Cuantia estimada:
          </label>
          <small>{errors.cuantiaEstimada}</small>
        </div>

        {/* VALOR DE LAS PRETENSIONES EN SMLVM */}
        <div className="form-floating">
          <input
            id="valorPretensionesSMLVM"
            name="valorPretensionesSMLVM"
            className={`form-control ${styles.formuladas}`}
            type="number"
            value={judicialProcesses.valorPretensionesSMLVM}
            disabled={true}
          />
          <label htmlFor="valorPretensionesSMLVM" className="form-label">
            Valor de las pretesiones en SMLVM:
          </label>
        </div>

        {/* PRETENSION ASUNTO */}
        <div className="form-floating">
          <textarea
            id="pretensionAsunto"
            name="pretensionAsunto"
            className={`form-control ${!errors.pretensionAsunto ? "" : "is-invalid"
              }`}
            value={judicialProcesses.pretensionAsunto}
            onChange={handleChange}
          />
          <label htmlFor="pretensionAsunto" className="form-label">
            Pretension asunto:
          </label>
          <small>{errors.pretensionAsunto}</small>
        </div>

        {/* INSTANCIA DEL PROCESO */}
        <div className="form-floating">
          <select
            id="instanciaProceso"
            name="instanciaProceso"
            className={`form-select ${!errors.instanciaProceso ? "" : "is-invalid"
              }`}
            value={judicialProcesses.instanciaProceso}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            {lists.instanciaProceso.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="instanciaProceso" className="form-label">
            Instancia del proceso:
          </label>
          <small>{errors.instanciaProceso}</small>
        </div>

        {/* FECHA DEL PROCESO */}
        <div className="form-floating">
          <input
            id="fechaProceso"
            name="fechaProceso"
            className="form-control"
            type="date"
            value={judicialProcesses.fechaProceso?.toISOString().split("T")[0]}
            onChange={handleChange}
          />
          <label htmlFor="fechaProceso" className="form-label">
            Fecha del ultimo estado:
          </label>
        </div>

        {/* ETAPA PROCESAL */}
        <div className="form-floating">
          <select
            id="etapaProcesal"
            name="etapaProcesal"
            className={`form-select ${!errors.etapaProcesal ? "" : "is-invalid"
              }`}
            value={judicialProcesses.etapaProcesal}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            {lists.etapaProcesal.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="etapaProcesal" className="form-label">
            Etapa procesal:
          </label>
          <small>{errors.etapaProcesal}</small>
        </div>

        {/* ULTIMO ESTADO DEL PROCESO */}
        <div className="form-floating">
          <textarea
            id="ultimoEstadoProceso"
            name="ultimoEstadoProceso"
            className="form-control"
            value={judicialProcesses.ultimoEstadoProceso}
            onChange={handleChange}
          />
          <label htmlFor="ultimoEstadoProceso" className="form-label">
            último estado del proceso:
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
                ?.toISOString()
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
            {lists.sentidoFalloPrimeraInstancia.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="sentidoFalloPrimeraInstancia" className="form-label">
            Sentido del fallo primera instancia:
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
                ?.toISOString()
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
                ?.toISOString()
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
            {lists.sentidoFalloSegundaInstancia.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="sentidoFalloSegundaInstancia" className="form-label">
            Sentido de fallo de segunda instancia:
          </label>
        </div>

        {/* RESUMEN PRIMERA INSTANCIA */}
        <div className="form-floating">
          <textarea
            id="resumenPrimeraInstancia"
            name="resumenPrimeraInstancia"
            className="form-control"
            value={judicialProcesses.resumenPrimeraInstancia}
            onChange={handleChange}
          />
          <label htmlFor="resumenPrimeraInstancia" className="form-label">
            Resumen primera instancia:
          </label>
        </div>

        {/* RESUMEN SEGUNDA INSTANCIA */}
        <div className="form-floating">
          <textarea
            id="resumenSegundaInstancia"
            name="resumenSegundaInstancia"
            className="form-control"
            value={judicialProcesses.resumenSegundaInstancia}
            onChange={handleChange}
          />
          <label htmlFor="resumenSegundaInstancia" className="form-label">
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
            {lists.incidente.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
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
            <option value="">Seleccionar</option>{" "}
            {lists.estadoIncidente.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="estadoIncidente" className="form-label">
            Estado incidente:
          </label>
        </div>

        {/* RESUMEN DEL INCIDENTE */}
        <div className="form-floating">
          <textarea
            id="resumenIncidente"
            name="resumenIncidente"
            className="form-control"
            value={judicialProcesses.resumenIncidente}
            onChange={handleChange}
          />
          <label htmlFor="resumenIncidente" className="form-label">
            Resumen incidente:
          </label>
        </div>

        {/* OBSERVACIONES / COMENTARIOS */}
        <div className="form-floating">
          <textarea
            id="observaciones"
            name="observaciones"
            className="form-control"
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
            {lists.calificacionContingente.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
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
            className={`form-select ${errors.estado ? "is-invalid" : ""}`}
            value={judicialProcesses.estado}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            {lists.estado.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="estado" className="form-label">
            Estado:
          </label>
          <small>{errors.estado}</small>
        </div>

        {/* FECHA DE TERMINACION */}
        <div className="form-floating">
          <input
            id="fechaTerminacion"
            name="fechaTerminacion"
            className={`form-control ${errors.fechaTerminacion ? "is-invalid" : ""
              }`}
            type="date"
            value={
              judicialProcesses.fechaTerminacion?.toISOString().split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaTerminacion" className="form-label">
            Fecha terminación:
          </label>
          <small>{errors.fechaTerminacion}</small>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button type="submit" className="btn btn-success">
          {processesDetails ? "Guardar proceso" : "Agregar proceso"}
        </button>
        {errorLength ? (
          <small>
            Hay{" "}
            {errorLength === 1
              ? `${errorLength} error`
              : `${errorLength} errores`}
          </small>
        ) : null}
      </div>
    </form>
  );
}
