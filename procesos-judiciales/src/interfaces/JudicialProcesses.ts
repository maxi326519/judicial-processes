import { Timestamp } from "firebase/firestore";

export interface JudicialProcesses {
  idSiproj: number;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  demandante: string;
}

export interface ProcessesFilters {
  apoderadoActual: string;
  idSiproj: number;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  demandante: string;
}

export interface ProcessesDetails {
  idSiproj: number;

  apoderadoActual: string;
  apoderadoAnterior: string;
  procesoAltoImpacto: string;

  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;

  tipoProceso: string;

  diasTerminoContestacion: number;
  fechaNotificacion: Timestamp;
  fechaContestacion: Timestamp;
  fechaLimiteProbContestacion: Timestamp;
  validacionContestacion: string;

  calidadActuacionEntidad: string;

  demandados: string;
  idDemanante: string;
  demandante: string;
  despachoInicial: string;
  despachoActual: string;

  posicionSDP: string;
  temaGeneral: string;

  pretensionAsunto: string;

  cuantiaEstimada: string;
  valorPretensionesSMLVM: number;

  instanciaProceso: string;
  fechaProceso: Timestamp;
  ultimoEstadoProceso: string;
  etapaProcesal: string;

  fechaFalloPrimeraInstancia: Timestamp;
  sentidoFalloPrimeraInstancia: string;
  resumenPrimeraInstancia: string;
  fechaPresentacionRecurso: Timestamp;
  fechaFalloSegundaInstancia: Timestamp;
  sentidoFalloSegundaInstancia: string;
  resumenSegundaInstanciaL: string;

  incidente: string;
  estadoIncidente: string;
  resumenIncidente: string;

  observaciones: string;

  calificacionContingente: string;
  estado: string;
  fechaTerminacion: Timestamp;
}

export interface Lists {
  procesoAltoImpacto: string[];
  tipoProceso: string[];
  calidadActuacionEntidad: string[];
  despachoInicial: string[];
  despachoActual: string[];
  posicionSDP: string[];
  temaGeneral: string[];
  instanciaProceso: string[];
  sentidoFalloPrimeraInstancia: string[];
  sentidoFalloSegundaInstancia: string[];
  incidente: string[];
  estadoIncidente: string[];
  calificacionContingente: string[];
  estado: string[];
}

export const initLists = {
  procesoAltoImpacto: [],
  tipoProceso: [],
  calidadActuacionEntidad: [],
  despachoInicial: [],
  despachoActual: [],
  posicionSDP: [],
  temaGeneral: [],
  instanciaProceso: [],
  sentidoFalloPrimeraInstancia: [],
  sentidoFalloSegundaInstancia: [],
  incidente: [],
  estadoIncidente: [],
  calificacionContingente: [],
  estado: [],
}

export const initProcessesFilters: ProcessesFilters = {
  apoderadoActual: "",
  idSiproj: 0,
  radRamaJudicialInicial: "",
  radRamaJudicialActual: "",
  demandante: "",
};

export const initProcessesDetails: ProcessesDetails = {
  idSiproj: 0,

  apoderadoActual: "",
  apoderadoAnterior: "",
  procesoAltoImpacto: "",

  radRamaJudicialInicial: "",
  radRamaJudicialActual: "",

  tipoProceso: "",

  diasTerminoContestacion: 0,
  fechaNotificacion: Timestamp.now(),
  fechaContestacion: Timestamp.now(),
  fechaLimiteProbContestacion: Timestamp.now(),
  validacionContestacion: "",

  calidadActuacionEntidad: "",

  demandados: "",
  idDemanante: "",
  demandante: "",
  despachoInicial: "",
  despachoActual: "",

  posicionSDP: "",
  temaGeneral: "",

  pretensionAsunto: "",

  cuantiaEstimada: "",
  valorPretensionesSMLVM: 0,

  instanciaProceso: "",
  fechaProceso: Timestamp.now(),
  ultimoEstadoProceso: "",
  etapaProcesal: "",

  fechaFalloPrimeraInstancia: Timestamp.now(),
  sentidoFalloPrimeraInstancia: "",
  resumenPrimeraInstancia: "",
  fechaPresentacionRecurso: Timestamp.now(),
  fechaFalloSegundaInstancia: Timestamp.now(),
  sentidoFalloSegundaInstancia: "",
  resumenSegundaInstanciaL: "",

  incidente: "",
  estadoIncidente: "",
  resumenIncidente: "",

  observaciones: "",

  calificacionContingente: "",
  estado: "",
  fechaTerminacion: Timestamp.now(),
};
