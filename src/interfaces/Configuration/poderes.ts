export interface PoderesConfig {
  id: boolean;
  fechaRadicacion: boolean;
  radicadoSipa: boolean;
  abogado: boolean;
  concepto: boolean;
  proceso: boolean;
  numero: boolean;
  accionante: boolean;
  observaciones: boolean;
}

export const initPoderesConfig = (): PoderesConfig => ({
  id: false,
  fechaRadicacion: false,
  radicadoSipa: false,
  abogado: false,
  concepto: false,
  proceso: false,
  numero: false,
  accionante: false,
  observaciones: false,
});
