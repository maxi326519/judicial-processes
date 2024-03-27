export interface PoderesHeads {
  radicadoSipa: string;
  abogado: string;
  concepto: string;
  accionante: string;
}

export interface PoderesDetails {
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
  fechaRadicacion: "",
  radicadoSipa: "",
  abogado: "",
  concepto: "",
  proceso: "",
  numero: "",
  accionante: "",
  observaciones: "",
});
