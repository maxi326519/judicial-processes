export interface ConciliacionesHeads {
  id?: string;
  fechaIngresoSolicitud: Date;
  radicadoSIPA: string;
}

export interface Conciliaciones {
  // 1 MOMENTO: NOTIFICACION DE SOLICITUD DE CONCILIACION
  id?: string;
  fechaIngresoSolicitud: Date;
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
  fechaComite: Date;

  // 3 MOMENTO: RECEPCION AL COMITÉ DE CONCILIACION
  desicionComite: string; // Listado
  estadoAudiencia: string; // Listado

  // DATOS COMPLEMENTARIOS
  procuraduriaRemitente: string; // Listado
  numeroSolicitud: string;
  fechaCitacionAudiencia: Date;
  observaciones: string;
}

export interface ConciliacionesFilters {
  id: string;
  fechaIngresoSolicitud: Date;
  radicadoSIPA: string;
}

export interface ErrorConciliaciones {
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
  fechaIngresoSolicitud: new Date(),
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
  fechaComite: new Date(),
  desicionComite: "",
  estadoAudiencia: "",
  procuraduriaRemitente: "",
  numeroSolicitud: "",
  fechaCitacionAudiencia: new Date(),
  observaciones: "",
});

export const initConciliacionesFilters = (): ConciliacionesFilters => ({
  id: "",
  fechaIngresoSolicitud: new Date(),
  radicadoSIPA: "",
});

export const initErrorConciliaciones = (): ErrorConciliaciones => ({
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
