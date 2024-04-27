export interface ConciliacionesHeads {
  id?: string;
  fechaIngresoSolicitud: Date | null;
  radicadoSIPA: string;
}

export interface Conciliaciones {
  // 1 MOMENTO: NOTIFICACION DE SOLICITUD DE CONCILIACION
  id?: string;
  fechaIngresoSolicitud: Date | null;
  radicadoSIPA: string;
  convocante: string;
  medioControl: string; // Listado
  pretension: string; // Listado
  asignacionAbogado: string; // Abogados
  estadoSolicitud: string;
  terminoLegal: string;

  // 2 MOMENTO: ESTUDIO DE CASO POR PARTE DEL ABOGADO
  consecutivo: number;
  radicadosSIPASolicitud: string;
  radicadosSIPARespuesta: string;
  fechaComite: Date | null;

  // 3 MOMENTO: RECEPCION AL COMITÉ DE CONCILIACION
  desicionComite: string; // Listado
  estadoAudiencia: string; // Listado

  // DATOS COMPLEMENTARIOS
  procuraduriaRemitente: string; // Listado
  numeroSolicitud: string;
  fechaCitacionAudiencia: Date | null;
  observaciones: string;
}

export interface ConciliacionesFilters {
  id: string;
  fechaIngresoSolicitud: Date | null;
  radicadoSIPA: string;
}

export interface ErrorConciliaciones {
  id: string;
  fechaIngresoSolicitud: string;
  radicadoSIPA: string;
  convocante: string;
  medioControl: string;
  pretension: string;
  asignacionAbogado: string;
  estadoSolicitud: string;
  terminoLegal: string;
  consecutivo: string;
  radicadosSIPASolicitud: string;
  radicadosSIPARespuesta: string;
  fechaComite: string;
  desicionComite: string;
  estadoAudiencia: string;
  procuraduriaRemitente: string;
  numeroSolicitud: string;
  fechaCitacionAudiencia: string;
  observaciones: string;
}

export const initConciliaciones = (): Conciliaciones => ({
  fechaIngresoSolicitud: null,
  radicadoSIPA: "",
  convocante: "",
  medioControl: "",
  pretension: "",
  asignacionAbogado: "",
  estadoSolicitud: "",
  terminoLegal: "",
  consecutivo: 0,
  radicadosSIPASolicitud: "",
  radicadosSIPARespuesta: "",
  fechaComite: null,
  desicionComite: "",
  estadoAudiencia: "",
  procuraduriaRemitente: "",
  numeroSolicitud: "",
  fechaCitacionAudiencia: null,
  observaciones: "",
});

export const initConciliacionesFilters = (): ConciliacionesFilters => ({
  id: "",
  fechaIngresoSolicitud: new Date(),
  radicadoSIPA: "",
});

export const initErrorConciliaciones = (): ErrorConciliaciones => ({
  id: "",
  fechaIngresoSolicitud: "",
  radicadoSIPA: "",
  convocante: "",
  medioControl: "",
  pretension: "",
  asignacionAbogado: "",
  estadoSolicitud: "",
  terminoLegal: "",
  consecutivo: "",
  radicadosSIPASolicitud: "",
  radicadosSIPARespuesta: "",
  fechaComite: "",
  desicionComite: "",
  estadoAudiencia: "",
  procuraduriaRemitente: "",
  numeroSolicitud: "",
  fechaCitacionAudiencia: "",
  observaciones: "",
});
