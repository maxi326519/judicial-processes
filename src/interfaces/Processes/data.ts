export interface ProcessHeads {
  idSiproj: number;
  estado: ProcessState;
  tipoProceso: string;
  apoderadoActual: string;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  demandante: string;
  posicionSDP: string;
}

export enum ProcessState {
  Activo = "ACTIVO",
  Terminado = "TERMINADO",
}

export interface ProcessFilters {
  idSiproj: number;
  apoderadoActual: string;
  tipoProceso: string;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  demandante: string;
  posicionSDP: string;
}

export interface ProcessDetails {
  apoderadoActual: string;
  apoderadoAnterior: string;
  idSiproj: number;
  procesoAltoImpacto: string;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  tipoProceso: string;
  diasTerminoContestacion: number;
  fechaNotificacion: Date | null;
  fechaAdmision: Date | null;
  fechaContestacion: Date | null;
  fechaLimiteProbContestacion: Date | null;
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
  fechaProceso: Date | null;
  ultimoEstadoProceso: string;
  etapaProcesal: string;
  fechaFalloPrimeraInstancia: Date | null;
  sentidoFalloPrimeraInstancia: string;
  resumenPrimeraInstancia: string;
  fechaPresentacionRecurso: Date | null;
  fechaFalloSegundaInstancia: Date | null;
  sentidoFalloSegundaInstancia: string;
  resumenSegundaInstancia: string;
  incidente: string;
  estadoIncidente: string;
  resumenIncidente: string;
  observaciones: string;
  calificacionContingente: string;
  estado: ProcessState;
  fechaTerminacion: Date | null;
}

export interface ErrorProcesses {
  apoderadoActual: string;
  idSiproj: string;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  tipoProceso: string;
  fechaNotificacion: string;
  calidadActuacionEntidad: string;
  demandados: string;
  idDemanante: string;
  demandante: string;
  despachoInicial: string;
  despachoActual: string;
  temaGeneral: string;
  pretensionAsunto: string;
  cuantiaEstimada: string;
  instanciaProceso: string;
  etapaProcesal: string;
  estado: string;
  fechaTerminacion: string;
}

export const initErrorProcesses: ErrorProcesses = {
  apoderadoActual: "",
  idSiproj: "",
  radRamaJudicialInicial: "",
  radRamaJudicialActual: "",
  tipoProceso: "",
  fechaNotificacion: "",
  calidadActuacionEntidad: "",
  demandados: "",
  idDemanante: "",
  demandante: "",
  despachoInicial: "",
  despachoActual: "",
  temaGeneral: "",
  pretensionAsunto: "",
  cuantiaEstimada: "",
  instanciaProceso: "",
  etapaProcesal: "",
  estado: "",
  fechaTerminacion: "",
};

export const initProcessFilters: ProcessFilters = {
  apoderadoActual: "",
  idSiproj: 0,
  tipoProceso: "",
  radRamaJudicialInicial: "",
  radRamaJudicialActual: "",
  demandante: "",
  posicionSDP: "",
};

export const initProcessDetails: ProcessDetails = {
  idSiproj: 0,
  apoderadoActual: "",
  apoderadoAnterior: "",
  procesoAltoImpacto: "",
  radRamaJudicialInicial: "",
  radRamaJudicialActual: "",
  tipoProceso: "",
  diasTerminoContestacion: 0,
  fechaNotificacion: null,
  fechaAdmision: null,
  fechaContestacion: null,
  fechaLimiteProbContestacion: null,
  validacionContestacion: "NO SE HA DILIGENCIADO FECHA DE CONTESTACION",
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
  fechaProceso: null,
  ultimoEstadoProceso: "",
  etapaProcesal: "",
  fechaFalloPrimeraInstancia: null,
  sentidoFalloPrimeraInstancia: "",
  resumenPrimeraInstancia: "",
  fechaPresentacionRecurso: null,
  fechaFalloSegundaInstancia: null,
  sentidoFalloSegundaInstancia: "",
  resumenSegundaInstancia: "",
  incidente: "",
  estadoIncidente: "",
  resumenIncidente: "",
  observaciones: "",
  calificacionContingente: "",
  estado: ProcessState.Activo,
  fechaTerminacion: null,
};
