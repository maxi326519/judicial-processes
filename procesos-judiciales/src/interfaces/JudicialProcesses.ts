import { Timestamp } from "firebase/firestore";

export interface JudicialProcesses {
  idEkogui: number;
  numProcesoRamaInicial: string;
  numProcesoRamaActual: string;
  nombreDemandante: string;
}

export interface ProcessesFilters {
  firma: string;
  idEkogui: number;
  numProcesoRamaInicial: string;
  numProcesoRamaActual: string;
  nombreDemandante: string;
}

export interface ProcessesDetails {
  firma: string;
  idEkogui: string;
  numberSGD: number;

  fechaRegistro: Timestamp;
  fechaOtorgamiento: Timestamp;
  fechaAdmision: Timestamp;
  fechaNotificacion: Timestamp;

  jurisdiccionAccion: string;
  diasTerminosContestacion: number;
  fechaContestacion: Timestamp;
  limiteProbable: number;
  validacionContestacion: string;

  documentoDemandante: string;
  nombreDemandante: string;
  otrosDemandantesDocumentos: string;
  otrosDemandantesNombres: string;
  demandadoDocumento: string;
  demandadoNombre: string;

  calidadActuacion: string;
  numeroRadicacion: number;
  departamentoDespachoInicial: string;
  departamentoDespachoActual: string;
  ciudadDespachoActual: string;
  despachoActual: string;

  numProcesoRamaInicial: number;
  codigoCiudadUno: number;
  ciudadRelacionadaUno: string;
  numProcesoRamaActual: number;
  codigoCiudadDos: number;
  ciudadRelacionadaDos: string;

  pretension: string;
  fichaRealizada: string;
  fichaIrregulares: string;
  tiempoEstimadoMeses: number;
  tiempoEstimadoAnios: number;
  porcentajeAjuste: number;
  fechaCalificacion: Timestamp;

  calificacionRiesgoProcesal: {
    fortalezaDefenza: string;
    fortalezaProbatoria: string;
    RiesgosProcesales: string;
    nivelJurisprudencia: string;
  };

  tipoValia: string;
  cuantiaEstimada: number;
  valorPredSMLVM: string;

  actFichasComiteConciliacion: false;
  expedienteDIgitalMEN: false;
  envioDocumento: false;
  estatoProcesoDespacho: string;
  detSituacionProcesal: string;

  fechaUltimaSituacion: Timestamp;
  instanciaActual: string;
  fechaFalloPrimeraInst: Timestamp;
  sentidoFalloPrimeraInst: string;
  valorCondenaPrimeraInst: number;
  valorCondenaObservaciones: string;

  recursoExtraordinario: string;
  llamamientoGarantia: string;
  providenciasExcepcionesPrev: string;
  providenciasPretDemanda: string;
  fechaEjecutoria: Timestamp;
  terminacionAnormal: string;
  valorAcuerdo: number;

  providenciasPretensiones: string;
  ejercerDefProvReferidas: string;
  soportesDocumentales: string;
  apoderadoNumId: number;

  nombreApoderado: string;
  numTarjetaProfApoderado: string;
  nombreAproderadoContraparte: string;
  emailApoderadoContraparte: string;
  telefonoApoderadoContraparte: number;

  zona: string /* Select */;
  estado: string /* Select */;
  fechaMesTerminacion: string;
}

export const initProcessesFilters: ProcessesFilters = {
  firma: "",
  idEkogui: 0,
  numProcesoRamaInicial: "",
  numProcesoRamaActual: "",
  nombreDemandante: "",
};

export const initProcessesDetails: ProcessesDetails = {
  firma: "",
  idEkogui: "",
  numberSGD: 0,

  fechaRegistro: Timestamp.now(),
  fechaOtorgamiento: Timestamp.now(),
  fechaAdmision: Timestamp.now(),
  fechaNotificacion: Timestamp.now(),

  jurisdiccionAccion: "",
  diasTerminosContestacion: 0,
  fechaContestacion: Timestamp.now(),
  limiteProbable: 0,
  validacionContestacion: "",

  documentoDemandante: "",
  nombreDemandante: "",
  otrosDemandantesDocumentos: "",
  otrosDemandantesNombres: "",
  demandadoDocumento: "",
  demandadoNombre: "",

  calidadActuacion: "",
  numeroRadicacion: 0,
  departamentoDespachoInicial: "",
  departamentoDespachoActual: "",
  ciudadDespachoActual: "",
  despachoActual: "",

  numProcesoRamaInicial: 0,
  codigoCiudadUno: 0,
  ciudadRelacionadaUno: "",
  numProcesoRamaActual: 0,
  codigoCiudadDos: 0,
  ciudadRelacionadaDos: "",

  pretension: "",
  fichaRealizada: "",
  fichaIrregulares: "",
  tiempoEstimadoMeses: 0,
  tiempoEstimadoAnios: 0,
  porcentajeAjuste: 0,
  fechaCalificacion: Timestamp.now(),

  calificacionRiesgoProcesal: {
    fortalezaDefenza: "",
    fortalezaProbatoria: "",
    RiesgosProcesales: "",
    nivelJurisprudencia: "",
  },

  tipoValia: "",
  cuantiaEstimada: 0,
  valorPredSMLVM: "",

  actFichasComiteConciliacion: false,
  expedienteDIgitalMEN: false,
  envioDocumento: false,
  estatoProcesoDespacho: "",
  detSituacionProcesal: "",

  fechaUltimaSituacion: Timestamp.now(),
  instanciaActual: "",
  fechaFalloPrimeraInst: Timestamp.now(),
  sentidoFalloPrimeraInst: "",
  valorCondenaPrimeraInst: 0,
  valorCondenaObservaciones: "",

  recursoExtraordinario: "",
  llamamientoGarantia: "",
  providenciasExcepcionesPrev: "",
  providenciasPretDemanda: "",
  fechaEjecutoria: Timestamp.now(),
  terminacionAnormal: "",
  valorAcuerdo: 0,

  providenciasPretensiones: "",
  ejercerDefProvReferidas: "",
  soportesDocumentales: "",
  apoderadoNumId: 0,

  nombreApoderado: "",
  numTarjetaProfApoderado: "",
  nombreAproderadoContraparte: "",
  emailApoderadoContraparte: "",
  telefonoApoderadoContraparte: 0,

  zona: "",
  estado: "",
  fechaMesTerminacion: "",
};
