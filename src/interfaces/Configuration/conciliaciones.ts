export interface ConciliacionesConfig {
  fechaIngresoSolicitud: boolean;
  radicadoSIPA: boolean;
  convocante: boolean;
  medioControl: boolean;
  pretension: boolean;
  asignacionAbogado: boolean;
  estadoSolicitud: boolean;
  terminoLegal: boolean;
  consecutivo: boolean;
  radicadosSIPASolicitud: boolean;
  radicadosSIPARespuesta: boolean;
  fechaComite: boolean;
  desicionComite: boolean;
  estadoAudiencia: boolean;
  procuraduriaRemitente: boolean;
  numeroSolicitud: boolean;
  fechaCitacionAudiencia: boolean;
  observaciones: boolean;
}

export const initConciliacionesConfig = (): ConciliacionesConfig => ({
  fechaIngresoSolicitud: false,
  radicadoSIPA: false,
  convocante: false,
  medioControl: false,
  pretension: false,
  asignacionAbogado: false,
  estadoSolicitud: false,
  terminoLegal: false,
  consecutivo: false,
  radicadosSIPASolicitud: false,
  radicadosSIPARespuesta: false,
  fechaComite: false,
  desicionComite: false,
  estadoAudiencia: false,
  procuraduriaRemitente: false,
  numeroSolicitud: false,
  fechaCitacionAudiencia: false,
  observaciones: false,
});