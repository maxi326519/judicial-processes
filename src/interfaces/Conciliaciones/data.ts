export interface ConciliacionesHeads {
  id?: number;
  fechaIngresoSolicitud: Date | null;
  radicadoSIPA: string;
  convocante: string;
  asignacionAbogado: string;
  estadoSolicitud: string;
  medioControl: string;
  decisionComite: string;
  terminoLegal: Date | null;
}

export interface Conciliaciones {
  // 1 MOMENTO: NOTIFICACION DE SOLICITUD DE CONCILIACION
  id?: number;
  fechaIngresoSolicitud: Date | null;
  radicadoSIPA: string;
  convocante: string;
  medioControl: string; // Listado
  pretension: string; // Listado
  valorEstimado: string;
  asignacionAbogado: string; // Abogados
  estadoSolicitud: string;
  terminoLegal: Date | null;

  // 2 MOMENTO: ESTUDIO DE CASO POR PARTE DEL ABOGADO
  consecutivo: number;
  radicadosSIPASolicitud: string;
  radicadosSIPARespuesta: string;
  fechaComite: Date | null;

  // 3 MOMENTO: RECEPCION AL COMITÉ DE CONCILIACION
  decisionComite: string; // Listado
  estadoAudiencia: string; // Listado

  // DATOS COMPLEMENTARIOS
  procuraduriaRemitente: string; // Listado
  numeroSolicitud: string;
  fechaCitacionAudiencia: Date | null;
  observaciones: string;
}

export interface ConciliacionesFilters {
  id?: number;
  fechaIngresoSolicitud: Date | null;
  radicadoSIPA: string;
  convocante: string;
  asignacionAbogado: string;
  estadoSolicitud: string;
  medioControl: string;
  decisionComite: string;
  estado: number;
}

export interface ErrorConciliaciones {
  id: string;
  fechaIngresoSolicitud: string;
  radicadoSIPA: string;
  convocante: string;
  medioControl: string;
  pretension: string;
  valorEstimado: string;
  asignacionAbogado: string;
  estadoSolicitud: string;
  terminoLegal: string;
  consecutivo: string;
  radicadosSIPASolicitud: string;
  radicadosSIPARespuesta: string;
  fechaComite: string;
  decisionComite: string;
  estadoAudiencia: string;
  procuraduriaRemitente: string;
  numeroSolicitud: string;
  fechaCitacionAudiencia: string;
  observaciones: string;
}

export const initConciliaciones = (id?: number): Conciliaciones => ({
  id: id || 0,
  fechaIngresoSolicitud: null,
  radicadoSIPA: "",
  convocante: "",
  medioControl: "",
  pretension: "",
  valorEstimado: "",
  asignacionAbogado: "",
  estadoSolicitud: "",
  terminoLegal: new Date(),
  consecutivo: 0,
  radicadosSIPASolicitud: "",
  radicadosSIPARespuesta: "",
  fechaComite: null,
  decisionComite: "",
  estadoAudiencia: "",
  procuraduriaRemitente: "",
  numeroSolicitud: "",
  fechaCitacionAudiencia: null,
  observaciones: "",
});

export const initConciliacionesFilters = (): ConciliacionesFilters => ({
  id: 0,
  fechaIngresoSolicitud: null,
  radicadoSIPA: "",
  convocante: "",
  asignacionAbogado: "",
  estadoSolicitud: "",
  medioControl: "",
  decisionComite: "",
  estado: 0,
});

export const initErrorConciliaciones = (): ErrorConciliaciones => ({
  id: "",
  fechaIngresoSolicitud: "",
  radicadoSIPA: "",
  convocante: "",
  medioControl: "",
  pretension: "",
  valorEstimado: "",
  asignacionAbogado: "",
  estadoSolicitud: "",
  terminoLegal: "",
  consecutivo: "",
  radicadosSIPASolicitud: "",
  radicadosSIPARespuesta: "",
  fechaComite: "",
  decisionComite: "",
  estadoAudiencia: "",
  procuraduriaRemitente: "",
  numeroSolicitud: "",
  fechaCitacionAudiencia: "",
  observaciones: "",
});
