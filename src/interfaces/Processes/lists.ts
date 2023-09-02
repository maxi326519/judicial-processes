export interface ProcessLists {
  apoderados: string[];
  procesoAltoImpacto: string[];
  tipoProceso: Array<{ tipo: string; dias: number }>;
  calidadActuacionEntidad: string[];
  despachoInicial: string[];
  despachoActual: string[];
  posicionSDP: string[];
  temaGeneral: string[];
  instanciaProceso: string[];
  etapaProcesal: string[];
  sentidoFalloPrimeraInstancia: string[];
  sentidoFalloSegundaInstancia: string[];
  incidente: string[];
  estadoIncidente: string[];
  calificacionContingente: string[];
  estado: string[];
  diasFestivos: string[];
  salariosMinimos: Array<{ fecha: string; salario: number }>;
}

export const initProcessLists: ProcessLists = {
  apoderados: [],
  procesoAltoImpacto: [],
  tipoProceso: [],
  calidadActuacionEntidad: [],
  despachoInicial: [],
  despachoActual: [],
  posicionSDP: [],
  temaGeneral: [],
  instanciaProceso: [],
  etapaProcesal: [],
  sentidoFalloPrimeraInstancia: [],
  sentidoFalloSegundaInstancia: [],
  incidente: [],
  estadoIncidente: [],
  calificacionContingente: [],
  estado: [],
  diasFestivos: [],
  salariosMinimos: [],
};

export interface DetalleRadicacion {
  actuacion: string;
  anotacion: string;
  cant: number;
  codRegla: string;
  conDocumentos: boolean;
  consActuacion: 21;
  fechaActuacion: string;
  fechaFinal: string | null;
  fechaInicial: string | null;
  fechaRegistro: string;
  idRegActuacion: number;
  llaveProceso: string;
}