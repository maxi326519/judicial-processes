export interface RequirementsHeads {
  id?: string;
  radicadoSipa: string;
  tipoProceso: string;
  remitenteGeneral: string;
  remitenteEspecifico: string;
}

export interface RequirementsFilters {
  radicadoSipa: string;
  tipoProceso: string;
  remitenteGeneral: string;
  remitenteEspecifico: string;
}

export interface RequirementsDetail {
  id?: string;
  consecutivo: number;
  fechaNotificacion: Date | null;
  radicadoSipa: string;
  remitenteGeneral: string;
  remitenteEspecifico: string;
  direccion: string;
  concepto: string;
  tipoProceso: string;
  numeroProceso: string;
  abogado: string;
  fechaVencimiento: Date | null;
  solicitudDadep: string;
  areaApoyo: string;
  solicitudConcepto: string;
  respuestaSolicitud: string;
  fechaRespuesta: Date | null;
  respuestaSipa: Date | null;
  estado: string;
  observaciones: string;
}

export interface ErrorRequirementsDetail {
  consecutivo: string;
  fechaNotificacion: string;
  radicadoSipa: string;
  remitenteGeneral: string;
  remitenteEspecifico: string;
  direccion: string;
  concepto: string;
  tipoProceso: string;
  numeroProceso: string;
  abogado: string;
  fechaVencimiento: string;
  solicitudDadep: string;
  areaApoyo: string;
  solicitudConcepto: string;
  respuestaSolicitud: string;
  fechaRespuesta: string;
  respuestaSipa: string;
  estado: string;
  observaciones: string;
}

export const initRequirementsHeads = (): RequirementsHeads => ({
  radicadoSipa: "",
  tipoProceso: "",
  remitenteGeneral: "",
  remitenteEspecifico: "",
});

export const initRequirementsFilters = (): RequirementsFilters => ({
  radicadoSipa: "",
  tipoProceso: "",
  remitenteGeneral: "",
  remitenteEspecifico: "",
});

export const initRequirementsDetail = (): RequirementsDetail => ({
  consecutivo: 0,
  fechaNotificacion: null,
  radicadoSipa: "",
  remitenteGeneral: "",
  remitenteEspecifico: "",
  direccion: "",
  concepto: "",
  tipoProceso: "",
  numeroProceso: "",
  abogado: "",
  fechaVencimiento: null,
  solicitudDadep: "",
  areaApoyo: "",
  solicitudConcepto: "",
  respuestaSolicitud: "",
  fechaRespuesta: null,
  respuestaSipa: null,
  estado: "",
  observaciones: "",
});

export const initErrorRequirementsDetail = (): ErrorRequirementsDetail => ({
  consecutivo: "",
  fechaNotificacion: "",
  radicadoSipa: "",
  remitenteGeneral: "",
  remitenteEspecifico: "",
  direccion: "",
  concepto: "",
  tipoProceso: "",
  numeroProceso: "",
  abogado: "",
  fechaVencimiento: "",
  solicitudDadep: "",
  areaApoyo: "",
  solicitudConcepto: "",
  respuestaSolicitud: "",
  fechaRespuesta: "",
  respuestaSipa: "",
  estado: "",
  observaciones: "",
});
