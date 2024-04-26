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
  desicionComite: string;  // Listado
  estadoAudiencia: string; // Listado

  // DATOS COMPLEMENTARIOS
  procuraduriaRemitente: string; // Listado
  numeroSolicitud: string;
  fechaCitacionAudiencia: Date;
  observaciones: string;
}
