export interface ProcessHeads {
  idSiproj: number;
  estado: ProcessState;
  tipoProceso: string;
  apoderadoActual: string;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  demandante: string;
  posicionSDP: string;
  movment?: boolean;
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
  estado: string;
  actuacion: string;
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
  fechaEjecutoria: Date | null;
  fechaTerminacion: Date | null;
}

export interface ErrorProcesses {
  apoderadoActual: string;
  apoderadoAnterior: string;
  idSiproj: string;
  procesoAltoImpacto: string;
  radRamaJudicialInicial: string;
  radRamaJudicialActual: string;
  tipoProceso: string;
  diasTerminoContestacion: string;
  fechaNotificacion: string;
  fechaAdmision: string;
  fechaContestacion: string;
  fechaLimiteProbContestacion: string;
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
  valorPretensionesSMLVM: string;
  instanciaProceso: string;
  fechaProceso: string;
  ultimoEstadoProceso: string;
  etapaProcesal: string;
  fechaFalloPrimeraInstancia: string;
  sentidoFalloPrimeraInstancia: string;
  resumenPrimeraInstancia: string;
  fechaPresentacionRecurso: string;
  fechaFalloSegundaInstancia: string;
  sentidoFalloSegundaInstancia: string;
  resumenSegundaInstancia: string;
  incidente: string;
  estadoIncidente: string;
  resumenIncidente: string;
  observaciones: string;
  calificacionContingente: string;
  estado: string;
  fechaEjecutoria: string;
  fechaTerminacion: string;
}

export const initErrorProcesses: ErrorProcesses = {
  apoderadoActual: "",
  apoderadoAnterior: "",
  idSiproj: "",
  procesoAltoImpacto: "",
  radRamaJudicialInicial: "",
  radRamaJudicialActual: "",
  tipoProceso: "",
  diasTerminoContestacion: "",
  fechaNotificacion: "",
  fechaAdmision: "",
  fechaContestacion: "",
  fechaLimiteProbContestacion: "",
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
  valorPretensionesSMLVM: "",
  instanciaProceso: "",
  fechaProceso: "",
  ultimoEstadoProceso: "",
  etapaProcesal: "",
  fechaFalloPrimeraInstancia: "",
  sentidoFalloPrimeraInstancia: "",
  resumenPrimeraInstancia: "",
  fechaPresentacionRecurso: "",
  fechaFalloSegundaInstancia: "",
  sentidoFalloSegundaInstancia: "",
  resumenSegundaInstancia: "",
  incidente: "",
  estadoIncidente: "",
  resumenIncidente: "",
  observaciones: "",
  calificacionContingente: "",
  estado: "",
  fechaEjecutoria: "",
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
  estado: "",
  actuacion: "",
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
  fechaEjecutoria: null,
  fechaTerminacion: null,
};
