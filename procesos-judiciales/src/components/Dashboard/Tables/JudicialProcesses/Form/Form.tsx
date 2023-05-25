import { useDispatch } from "react-redux";
import useJudicialProcesses from "../../../../../hooks/useJudicialProcesses";
import style from "./Form.module.css";
import { setProcesses } from "../../../../../redux/actions/judicialProcesses";
import swal from "sweetalert";

interface Props {
  handleClose: () => void;
}

export default function Form({ handleClose }: Props) {
  const dispatch = useDispatch();
  const { judicialProcesses, setJudicialProcesses } = useJudicialProcesses();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch<any>(setProcesses(judicialProcesses))
      .then(() => {
        swal("Guardado", "Se guardo el proceso judicial", "success");
      })
      .catch(() => {
        swal("Error", "No se pudo guardar el proceso judicial", "error");
      });
  }

  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    setJudicialProcesses({
      ...judicialProcesses,
      [event.target.name]: event.target.value,
    });
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
      <div className={style.flex}>
        <div className="form-floating">
          <input
            type="text"
            id="firma"
            name="firma"
            className="form-control"
            value={judicialProcesses.firma}
            onChange={handleChange}
          />
          <label htmlFor="firma" className="form-label">
            Firma:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="idEkogui"
            name="idEkogui"
            className="form-control"
            value={judicialProcesses.idEkogui}
            onChange={handleChange}
          />
          <label htmlFor="idEkogui" className="form-label">
            ID Ekogui:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="numberSGD"
            name="numberSGD"
            className="form-control"
            value={judicialProcesses.numberSGD}
            onChange={handleChange}
          />
          <label htmlFor="numberSGD" className="form-label">
            Number SGD:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="date"
            id="fechaRegistro"
            name="fechaRegistro"
            className="form-control"
            value={
              judicialProcesses.fechaRegistro
                .toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaRegistro" className="form-label">
            fechaRegistro:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="date"
            id="fechaOtorgamiento"
            name="fechaOtorgamiento"
            className="form-control"
            value={
              judicialProcesses.fechaOtorgamiento
                .toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaOtorgamiento" className="form-label">
            fechaOtorgamiento:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="date"
            id="fechaAdmision"
            name="fechaAdmision"
            className="form-control"
            value={
              judicialProcesses.fechaAdmision
                .toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaAdmision" className="form-label">
            fechaAdmision:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="date"
            id="fechaNotificacion"
            name="fechaNotificacion"
            className="form-control"
            value={
              judicialProcesses.fechaNotificacion
                .toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaNotificacion" className="form-label">
            fechaNotificacion:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="string"
            id="jurisdiccionAccion"
            name="jurisdiccionAccion"
            className="form-control"
            value={judicialProcesses.jurisdiccionAccion}
            onChange={handleChange}
          />
          <label htmlFor="jurisdiccionAccion" className="form-label">
            jurisdiccionAccion:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="diasTerminosContestacion"
            name="diasTerminosContestacion"
            className="form-control"
            value={judicialProcesses.diasTerminosContestacion}
            onChange={handleChange}
          />
          <label htmlFor="diasTerminosContestacion" className="form-label">
            diasTerminosContestacion:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="date"
            id="fechaContestacion"
            name="fechaContestacion"
            className="form-control"
            value={
              judicialProcesses.fechaContestacion
                .toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaContestacion" className="form-label">
            fechaContestacion:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="limiteProbable"
            name="limiteProbable"
            className="form-control"
            value={judicialProcesses.limiteProbable}
            onChange={handleChange}
          />
          <label htmlFor="limiteProbable" className="form-label">
            limiteProbable:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="validacionContestacion"
            name="validacionContestacion"
            className="form-control"
            value={judicialProcesses.validacionContestacion}
            onChange={handleChange}
          />
          <label htmlFor="validacionContestacion" className="form-label">
            validacionContestacion:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="documentoDemandante"
            name="documentoDemandante"
            className="form-control"
            value={judicialProcesses.documentoDemandante}
            onChange={handleChange}
          />
          <label htmlFor="documentoDemandante" className="form-label">
            Otros Demandantes Nombres:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="nombreDemandante"
            name="nombreDemandante"
            className="form-control"
            value={judicialProcesses.nombreDemandante}
            onChange={handleChange}
          />
          <label htmlFor="nombreDemandante" className="form-label">
            Nombre Demandante:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="otrosDemandantesDocumentos"
            name="otrosDemandantesDocumentos"
            className="form-control"
            value={judicialProcesses.otrosDemandantesDocumentos}
            onChange={handleChange}
          />
          <label htmlFor="otrosDemandantesDocumentos" className="form-label">
            Otros Demandantes Documentos:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="otrosDemandantesNombres"
            name="otrosDemandantesNombres"
            className="form-control"
            value={judicialProcesses.otrosDemandantesNombres}
            onChange={handleChange}
          />
          <label htmlFor="otrosDemandantesNombres" className="form-label">
            Otros Demandantes Nombres:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="demandadoDocumento"
            name="demandadoDocumento"
            className="form-control"
            value={judicialProcesses.demandadoDocumento}
            onChange={handleChange}
          />
          <label htmlFor="demandadoDocumento" className="form-label">
            Demandado Documento:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="demandadoNombre"
            name="demandadoNombre"
            className="form-control"
            value={judicialProcesses.demandadoNombre}
            onChange={handleChange}
          />
          <label htmlFor="demandadoNombre" className="form-label">
            Demandado Nombre:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="calidadActuacion"
            name="calidadActuacion"
            className="form-select"
            value={judicialProcesses.calidadActuacion}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="calidadActuacion" className="form-label">
            Calidad Actuación:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="numeroRadicacion"
            name="numeroRadicacion"
            className="form-control"
            value={judicialProcesses.numeroRadicacion}
            onChange={handleChange}
          />
          <label htmlFor="numeroRadicacion" className="form-label">
            Número de Radicación:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="departamentoDespachoInicial"
            name="departamentoDespachoInicial"
            className="form-select"
            value={judicialProcesses.departamentoDespachoInicial}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="departamentoDespachoInicial" className="form-label">
            Departamento Despacho Inicial:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="departamentoDespachoActual"
            name="departamentoDespachoActual"
            className="form-select"
            value={judicialProcesses.departamentoDespachoActual}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="departamentoDespachoActual" className="form-label">
            Departamento Despacho Actual:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="ciudadDespachoActual"
            name="ciudadDespachoActual"
            className="form-select"
            value={judicialProcesses.ciudadDespachoActual}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="ciudadDespachoActual" className="form-label">
            Ciudad Despacho Actual:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="despachoActual"
            name="despachoActual"
            className="form-control"
            value={judicialProcesses.despachoActual}
            onChange={handleChange}
          />
          <label htmlFor="despachoActual" className="form-label">
            Despacho Actual:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="numProcesoRamaInicial"
            name="numProcesoRamaInicial"
            className="form-control"
            value={judicialProcesses.numProcesoRamaInicial}
            onChange={handleChange}
          />
          <label htmlFor="numProcesoRamaInicial" className="form-label">
            Número de Proceso Rama Inicial:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="codigoCiudadUno"
            name="codigoCiudadUno"
            className="form-control"
            value={judicialProcesses.codigoCiudadUno}
            onChange={handleChange}
          />
          <label htmlFor="codigoCiudadUno" className="form-label">
            Código de Ciudad Uno:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="ciudadRelacionadaUno"
            name="ciudadRelacionadaUno"
            className="form-control"
            value={judicialProcesses.ciudadRelacionadaUno}
            onChange={handleChange}
          />
          <label htmlFor="ciudadRelacionadaUno" className="form-label">
            Ciudad Relacionada Uno:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="numProcesoRamaActual"
            name="numProcesoRamaActual"
            className="form-control"
            value={judicialProcesses.numProcesoRamaActual}
            onChange={handleChange}
          />
          <label htmlFor="numProcesoRamaActual" className="form-label">
            Número de Proceso Rama Actual:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="codigoCiudadDos"
            name="codigoCiudadDos"
            className="form-control"
            value={judicialProcesses.codigoCiudadDos}
            onChange={handleChange}
          />
          <label htmlFor="codigoCiudadDos" className="form-label">
            Código de Ciudad Dos:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="ciudadRelacionadaDos"
            name="ciudadRelacionadaDos"
            className="form-control"
            value={judicialProcesses.ciudadRelacionadaDos}
            onChange={handleChange}
          />
          <label htmlFor="ciudadRelacionadaDos" className="form-label">
            Ciudad Relacionada Dos:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="pretension"
            name="pretension"
            className="form-control"
            value={judicialProcesses.pretension}
            onChange={handleChange}
          />
          <label htmlFor="pretension" className="form-label">
            Pretensión:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="fichaRealizada"
            name="fichaRealizada"
            className="form-select"
            value={judicialProcesses.fichaRealizada}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="fichaRealizada" className="form-label">
            Ficha Realizada:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="fichaIrregulares"
            name="fichaIrregulares"
            className="form-select"
            value={judicialProcesses.fichaIrregulares}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="fichaIrregulares" className="form-label">
            Ficha Irregulares:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="tiempoEstimadoMeses"
            name="tiempoEstimadoMeses"
            className="form-control"
            value={judicialProcesses.tiempoEstimadoMeses}
            onChange={handleChange}
          />
          <label htmlFor="tiempoEstimadoMeses" className="form-label">
            Tiempo Estimado en Meses:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="tiempoEstimadoAnios"
            name="tiempoEstimadoAnios"
            className="form-control"
            value={judicialProcesses.tiempoEstimadoAnios}
            onChange={handleChange}
          />
          <label htmlFor="tiempoEstimadoAnios" className="form-label">
            Tiempo Estimado en Años:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="porcentajeAjuste"
            name="porcentajeAjuste"
            className="form-control"
            value={judicialProcesses.porcentajeAjuste}
            onChange={handleChange}
          />
          <label htmlFor="porcentajeAjuste" className="form-label">
            Porcentaje de Ajuste:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="fechaCalificacion"
            name="fechaCalificacion"
            className="form-control"
            value={
              judicialProcesses.fechaCalificacion
                .toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaCalificacion" className="form-label">
            Fecha de Calificación:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="calificacionRiesgoProcesal-fortalezaDefenza"
            name="calificacionRiesgoProcesal.fortalezaDefenza"
            className="form-select"
            value={
              judicialProcesses.calificacionRiesgoProcesal.fortalezaDefenza
            }
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label
            htmlFor="calificacionRiesgoProcesal-fortalezaDefenza"
            className="form-label"
          >
            Fortaleza Defensa:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="calificacionRiesgoProcesal-fortalezaProbatoria"
            name="calificacionRiesgoProcesal.fortalezaProbatoria"
            className="form-select"
            value={
              judicialProcesses.calificacionRiesgoProcesal.fortalezaProbatoria
            }
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label
            htmlFor="calificacionRiesgoProcesal-fortalezaProbatoria"
            className="form-label"
          >
            Fortaleza Probatoria:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="calificacionRiesgoProcesal-RiesgosProcesales"
            name="calificacionRiesgoProcesal.RiesgosProcesales"
            className="form-select"
            value={
              judicialProcesses.calificacionRiesgoProcesal.RiesgosProcesales
            }
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label
            htmlFor="calificacionRiesgoProcesal-RiesgosProcesales"
            className="form-label"
          >
            Riesgos Procesales:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="calificacionRiesgoProcesal-nivelJurisprudencia"
            name="calificacionRiesgoProcesal.nivelJurisprudencia"
            className="form-select"
            value={
              judicialProcesses.calificacionRiesgoProcesal.nivelJurisprudencia
            }
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label
            htmlFor="calificacionRiesgoProcesal-nivelJurisprudencia"
            className="form-label"
          >
            Nivel Jurisprudencia:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="tipoValia"
            name="tipoValia"
            className="form-select"
            value={judicialProcesses.tipoValia}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="tipoValia" className="form-label">
            Tipo Valia:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="cuantiaEstimada"
            name="cuantiaEstimada"
            className="form-control"
            value={judicialProcesses.cuantiaEstimada}
            onChange={handleChange}
          />
          <label htmlFor="cuantiaEstimada" className="form-label">
            Cuantía Estimada:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="valorPredSMLVM"
            name="valorPredSMLVM"
            className="form-control"
            value={judicialProcesses.valorPredSMLVM}
            onChange={handleChange}
          />
          <label htmlFor="valorPredSMLVM" className="form-label">
            Valor PredSMLVM:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="actFichasComiteConciliacion"
            name="actFichasComiteConciliacion"
            className="form-select"
            value={judicialProcesses.actFichasComiteConciliacion.toString()}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="actFichasComiteConciliacion" className="form-label">
            Act Fichas Comite Conciliacion:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="expedienteDIgitalMEN"
            name="expedienteDIgitalMEN"
            className="form-select"
            value={judicialProcesses.expedienteDIgitalMEN.toString()}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="expedienteDIgitalMEN" className="form-label">
            Expediente Digital MEN:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="envioDocumento"
            name="envioDocumento"
            className="form-select"
            value={judicialProcesses.envioDocumento.toString()}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="envioDocumento" className="form-label">
            Envío Documento:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="estatoProcesoDespacho"
            name="estatoProcesoDespacho"
            className="form-select"
            value={judicialProcesses.estatoProcesoDespacho}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="estatoProcesoDespacho" className="form-label">
            Estado Proceso Despacho:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="detSituacionProcesal"
            name="detSituacionProcesal"
            className="form-control"
            value={judicialProcesses.detSituacionProcesal}
            onChange={handleChange}
          />
          <label htmlFor="detSituacionProcesal" className="form-label">
            Detalle Situación Procesal:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="date"
            id="fechaUltimaSituacion"
            name="fechaUltimaSituacion"
            className="form-control"
            value={
              judicialProcesses.fechaUltimaSituacion
                .toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaUltimaSituacion" className="form-label">
            Fecha Última Situación:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="instanciaActual"
            name="instanciaActual"
            className="form-select"
            value={judicialProcesses.instanciaActual}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="instanciaActual" className="form-label">
            Instancia Actual:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="date"
            id="fechaFalloPrimeraInst"
            name="fechaFalloPrimeraInst"
            className="form-control"
            value={
              judicialProcesses.fechaFalloPrimeraInst
                .toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaFalloPrimeraInst" className="form-label">
            Fecha Fallo Primera Instancia:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="sentidoFalloPrimeraInst"
            name="sentidoFalloPrimeraInst"
            className="form-select"
            value={judicialProcesses.sentidoFalloPrimeraInst}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="sentidoFalloPrimeraInst" className="form-label">
            Sentido Fallo Primera Instancia:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="valorCondenaPrimeraInst"
            name="valorCondenaPrimeraInst"
            className="form-control"
            value={judicialProcesses.valorCondenaPrimeraInst}
            onChange={handleChange}
          />
          <label htmlFor="valorCondenaPrimeraInst" className="form-label">
            Valor Condena Primera Instancia:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="valorCondenaObservaciones"
            name="valorCondenaObservaciones"
            className="form-control"
            value={judicialProcesses.valorCondenaObservaciones}
            onChange={handleChange}
          />
          <label htmlFor="valorCondenaObservaciones" className="form-label">
            Observaciones Valor Condena:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="recursoExtraordinario"
            name="recursoExtraordinario"
            className="form-select"
            value={judicialProcesses.recursoExtraordinario}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="recursoExtraordinario" className="form-label">
            Recurso Extraordinario:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="llamamientoGarantia"
            name="llamamientoGarantia"
            className="form-select"
            value={judicialProcesses.llamamientoGarantia}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="llamamientoGarantia" className="form-label">
            Llamamiento a Garantía:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="providenciasExcepcionesPrev"
            name="providenciasExcepcionesPrev"
            className="form-select"
            value={judicialProcesses.providenciasExcepcionesPrev}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="providenciasExcepcionesPrev" className="form-label">
            Providencias Excepciones Previas:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="providenciasPretDemanda"
            name="providenciasPretDemanda"
            className="form-select"
            value={judicialProcesses.providenciasPretDemanda}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="providenciasPretDemanda" className="form-label">
            Providencias Pretensión Demanda:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="date"
            id="fechaEjecutoria"
            name="fechaEjecutoria"
            className="form-control"
            value={
              judicialProcesses.fechaEjecutoria
                .toDate()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
          />
          <label htmlFor="fechaEjecutoria" className="form-label">
            Fecha Ejecutoria:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="terminacionAnormal"
            name="terminacionAnormal"
            className="form-select"
            value={judicialProcesses.terminacionAnormal}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="terminacionAnormal" className="form-label">
            Terminación Anormal:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="valorAcuerdo"
            name="valorAcuerdo"
            className="form-control"
            value={judicialProcesses.valorAcuerdo}
            onChange={handleChange}
          />
          <label htmlFor="valorAcuerdo" className="form-label">
            Valor Acuerdo:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="providenciasPretensiones"
            name="providenciasPretensiones"
            className="form-select"
            value={judicialProcesses.providenciasPretensiones}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="providenciasPretensiones" className="form-label">
            Providencias Pretensiones:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="ejercerDefProvReferidas"
            name="ejercerDefProvReferidas"
            className="form-select"
            value={judicialProcesses.ejercerDefProvReferidas}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="ejercerDefProvReferidas" className="form-label">
            Ejercer Defensa en Providencias Referidas:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="soportesDocumentales"
            name="soportesDocumentales"
            className="form-select"
            value={judicialProcesses.soportesDocumentales}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="soportesDocumentales" className="form-label">
            Soportes Documentales:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="apoderadoNumId"
            name="apoderadoNumId"
            className="form-control"
            value={judicialProcesses.apoderadoNumId}
            onChange={handleChange}
          />
          <label htmlFor="apoderadoNumId" className="form-label">
            Número de Identificación del Apoderado:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="nombreApoderado"
            name="nombreApoderado"
            className="form-control"
            value={judicialProcesses.nombreApoderado}
            onChange={handleChange}
          />
          <label htmlFor="nombreApoderado" className="form-label">
            Nombre del Apoderado:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="numTarjetaProfApoderado"
            name="numTarjetaProfApoderado"
            className="form-control"
            value={judicialProcesses.numTarjetaProfApoderado}
            onChange={handleChange}
          />
          <label htmlFor="numTarjetaProfApoderado" className="form-label">
            Número de Tarjeta Profesional del Apoderado:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="nombreAproderadoContraparte"
            name="nombreAproderadoContraparte"
            className="form-control"
            value={judicialProcesses.nombreAproderadoContraparte}
            onChange={handleChange}
          />
          <label htmlFor="nombreAproderadoContraparte" className="form-label">
            Nombre del Apoderado de la Contraparte:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            id="emailApoderadoContraparte"
            name="emailApoderadoContraparte"
            className="form-control"
            value={judicialProcesses.emailApoderadoContraparte}
            onChange={handleChange}
          />
          <label htmlFor="emailApoderadoContraparte" className="form-label">
            Email del Apoderado de la Contraparte:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="telefonoApoderadoContraparte"
            name="telefonoApoderadoContraparte"
            className="form-control"
            value={judicialProcesses.telefonoApoderadoContraparte}
            onChange={handleChange}
          />
          <label htmlFor="telefonoApoderadoContraparte" className="form-label">
            Teléfono del Apoderado de la Contraparte:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="zona"
            name="zona"
            className="form-select"
            value={judicialProcesses.zona}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="zona" className="form-label">
            Zona:
          </label>
        </div>

        <div className="form-floating">
          <select
            id="estado"
            name="estado"
            className="form-select"
            value={judicialProcesses.estado}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="opcion1">Opción 1</option>
          </select>
          <label htmlFor="estado" className="form-label">
            Estado:
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="fechaMesTerminacion"
            name="fechaMesTerminacion"
            className="form-control"
            value={judicialProcesses.fechaMesTerminacion}
            onChange={handleChange}
          />
          <label htmlFor="fechaMesTerminacion" className="form-label">
            Fecha Mes Terminación:
          </label>
        </div>

        <button type="submit" className="btn btn-success">
          Agregar proceso judicial
        </button>
      </div>
    </form>
  );
}
