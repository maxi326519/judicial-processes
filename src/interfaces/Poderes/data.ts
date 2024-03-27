export interface PoderesHeads {
  id: string;
  radicadoSipa: string;
  abogado: string;
  concepto: string;
  accionante: string;
}

export interface PoderesDetails {
  id: string;
  fechaRadicacion: Date;
  radicadoSipa: string;
  abogado: string; // Listado
  concepto: string; // Listado
  proceso: string; // Listado
  numero: number;
  accionante: string;
  observaciones: string;
}

export interface PoderesFilters {
  radicadoSipa: string;
  abogado: string;
  concepto: string;
  accionante: string;
}

export interface ErrorPoderesDetails {
  id: string,
  fechaRadicacion: string;
  radicadoSipa: string;
  abogado: string;
  concepto: string;
  proceso: string;
  numero: string;
  accionante: string;
  observaciones: string;
}

export const initPoderesDetails = (): PoderesDetails => ({
  id: "",
  fechaRadicacion: new Date(),
  radicadoSipa: "",
  abogado: "",
  concepto: "",
  proceso: "",
  numero: 0,
  accionante: "",
  observaciones: "",
});

export const initPoderesFilters = (): PoderesFilters => ({
  radicadoSipa: "",
  abogado: "",
  concepto: "",
  accionante: "",
});

export const initErrorPoderesDetails = (): ErrorPoderesDetails => ({
  id: "",
  fechaRadicacion: "",
  radicadoSipa: "",
  abogado: "",
  concepto: "",
  proceso: "",
  numero: "",
  accionante: "",
  observaciones: "",
});
