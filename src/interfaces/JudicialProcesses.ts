import { Timestamp } from "firebase/firestore";

export interface JudicialProcesses {
  id?: string;
  idDetails?: string;
  idSiproj: number;
  estado: ProcessesState;
  apoderadoActual: string;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  demandante: string;
}

export enum ProcessesState {
  Activo = "activo",
  Terminado = "terminado",
}

export interface ProcessesFilters {
  idSiproj: number;
  apoderadoActual: string;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  demandante: string;
}

export interface ProcessesDetails {
  id?: string;
  idHead?: string;

  apoderadoActual: string;
  apoderadoAnterior: string;
  idSiproj: number;
  procesoAltoImpacto: string;

  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;

  tipoProceso: string;

  diasTerminoContestacion: number;
  fechaNotificacion: Timestamp | null;
  fechaAdmision: Timestamp | null;
  fechaContestacion: Timestamp | null;
  fechaLimiteProbContestacion: Timestamp | null;
  validacionContestacion: string;

  calidadActuacionEntidad: string;

  demandados: string;
  idDemanante: number;
  demandante: string;
  despachoInicial: string;
  despachoActual: string;

  posicionSDP: string;
  temaGeneral: string;

  pretensionAsunto: string;

  cuantiaEstimada: number;
  valorPretensionesSMLVM: number;

  instanciaProceso: string;
  fechaProceso: Timestamp | null;
  ultimoEstadoProceso: string;
  etapaProcesal: string;

  fechaFalloPrimeraInstancia: Timestamp | null;
  sentidoFalloPrimeraInstancia: string;
  resumenPrimeraInstancia: string;
  fechaPresentacionRecurso: Timestamp | null;
  fechaFalloSegundaInstancia: Timestamp | null;
  sentidoFalloSegundaInstancia: string;
  resumenSegundaInstancia: string;

  incidente: string;
  estadoIncidente: string;
  resumenIncidente: string;

  observaciones: string;

  calificacionContingente: string;
  estado: ProcessesState;
  fechaTerminacion: Timestamp | null;
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
  diasFestivos: string[];
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
  diasFestivos: [],
};

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
  fechaAdmision: Timestamp.now(),
  fechaContestacion: Timestamp.now(),
  fechaLimiteProbContestacion: Timestamp.now(),
  validacionContestacion: "",

  calidadActuacionEntidad: "",

  demandados: "",
  idDemanante: 0,
  demandante: "",
  despachoInicial: "",
  despachoActual: "",

  posicionSDP: "",
  temaGeneral: "",

  pretensionAsunto: "",

  cuantiaEstimada: 0,
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
  resumenSegundaInstancia: "",

  incidente: "",
  estadoIncidente: "",
  resumenIncidente: "",

  observaciones: "",

  calificacionContingente: "",
  estado: ProcessesState.Activo,
  fechaTerminacion: Timestamp.now(),
};