export interface RequirementsConfig {
  consecutivo: boolean;
  fechaNotificacion: boolean;
  radicadoSipa: boolean;
  remitenteGeneral: boolean;
  remitenteEspecifico: boolean;
  direccion: boolean;
  concepto: boolean;
  tipoProceso: boolean;
  numeroProceso: boolean;
  abogado: boolean;
  fechaVencimiento: boolean;
  solicitudDadep: boolean;
  areaApoyo: boolean;
  solicitudConcepto: boolean;
  respuestaSolicitud: boolean;
  fechaRespuesta: boolean;
  respuestaSipa: boolean;
  estado: boolean;
  observaciones: boolean;
}

export const initRequirementsConfig = (): RequirementsConfig => ({
  consecutivo: false,
  fechaNotificacion: false,
  radicadoSipa: false,
  remitenteGeneral: false,
  remitenteEspecifico: false,
  direccion: false,
  concepto: false,
  tipoProceso: false,
  numeroProceso: false,
  abogado: false,
  fechaVencimiento: false,
  solicitudDadep: false,
  areaApoyo: false,
  solicitudConcepto: false,
  respuestaSolicitud: false,
  fechaRespuesta: false,
  respuestaSipa: false,
  estado: false,
  observaciones: false,
});
