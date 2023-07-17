export interface TutelaHeads {
  id?: string;
  idSiproj: number;
  nroTutela: string;
  abogado: string;
  temaTutela: string;
  demandanteId: string;
  demandante: string;
  derechoVulnerado: string;
}

export interface TutelaFilters {
  idSiproj: number;
  nroTutela: string;
  abogado: string;
  temaTutela: string;
  demandanteId: string;
  demandante: string;
  derechoVulnerado: string;
}

export interface UserSelected {
  user: string;
  available: boolean;
}

export interface TutelaDetails {
  id?: string;
  idSiproj: number;
  nroTutela: string;
  tipo: string;
  fecha: Date | null;
  radicado: string;
  demandanteId: string;
  demandante: string;
  demandado: string;
  temaTutela: string;
  derechoVulnerado: string;
  extranjero: boolean;
  concepto: string;
  termino: string;
  remite: string;
  abogado: string;
  fechaVencimiento: Date | null;
  fechaRespuesta: Date | null;
  radicadoSalida: string;
  validacionRespuesta: string;
  oficioAdicional: string;
  fallo1raInst: string;
  fechaFallo1raInst: Date | null;
  observacionFallo1raInst: string;
  terminoCumplimiento1raInst: number;
  cumplimiento1raInst: string;
  fechaCumplimiento1raInst: Date | null;
  impugnacionSDP: number;
  fechaImpugnacion: Date | null;
  fallo2daInst: string;
  fechaFallo2daInst: Date | null;
  observacionFallo2daInst: string;
  terminoCumplimiento2daInst: number;
  cumplimiento2daInst: string;
  fechaCumplimiento2daInst: Date | null;
  incidenteDesacato: string;
  observacionesGenerales: string;
}

export interface ErrorTutelaDetails {
  idSiproj: string;
  nroTutela: string;
  tipo: string;
  fecha: string;
  radicado: string;
  demandanteId: string;
  demandante: string;
  demandado: string;
  temaTutela: string;
  derechoVulnerado: string;
  extranjero: string;
  concepto: string;
  termino: string;
  remite: string;
  abogado: string;
  fechaVencimiento: string;
  fechaRespuesta: string;
  radicadoSalida: string;
  validacionRespuesta: string;
  oficioAdicional: string;
  fallo1raInst: string;
  fechaFallo1raInst: string;
  observacionFallo1raInst: string;
  terminoCumplimiento1raInst: string;
  cumplimiento1raInst: string;
  fechaCumplimiento1raInst: string;
  impugnacionSDP: string;
  fechaImpugnacion: string;
  fallo2daInst: string;
  fechaFallo2daInst: string;
  observacionFallo2daInst: string;
  terminoCumplimiento2daInst: string;
  cumplimiento2daInst: string;
  fechaCumplimiento2daInst: string;
  incidenteDesacato: string;
  observacionesGenerales: string;
}

export const initTutelaFilters: TutelaFilters = {
  idSiproj: 0,
  nroTutela: "",
  abogado: "",
  temaTutela: "",
  demandanteId: "",
  demandante: "",
  derechoVulnerado: "",
};

export const initTutelaDetails: TutelaDetails = {
  idSiproj: 0,
  nroTutela: "",
  tipo: "",
  fecha: null,
  radicado: "",
  demandanteId: "",
  demandante: "",
  demandado: "",
  temaTutela: "",
  derechoVulnerado: "",
  extranjero: false,
  concepto: "",
  termino: "",
  remite: "",
  abogado: "",
  fechaVencimiento: null,
  fechaRespuesta: null,
  radicadoSalida: "",
  validacionRespuesta: "NO SE DILIGENCIO",
  oficioAdicional: "",
  fallo1raInst: "",
  fechaFallo1raInst: null,
  observacionFallo1raInst: "",
  terminoCumplimiento1raInst: 0,
  cumplimiento1raInst: "",
  fechaCumplimiento1raInst: null,
  impugnacionSDP: 0,
  fechaImpugnacion: null,
  fallo2daInst: "",
  fechaFallo2daInst: null,
  observacionFallo2daInst: "",
  terminoCumplimiento2daInst: 0,
  cumplimiento2daInst: "",
  fechaCumplimiento2daInst: null,
  incidenteDesacato: "",
  observacionesGenerales: "",
};

export const initErrorTutelaDetails: ErrorTutelaDetails = {
  idSiproj: "",
  nroTutela: "",
  tipo: "",
  fecha: "",
  radicado: "",
  demandanteId: "",
  demandante: "",
  demandado: "",
  temaTutela: "",
  derechoVulnerado: "",
  extranjero: "",
  concepto: "",
  termino: "",
  remite: "",
  abogado: "",
  fechaVencimiento: "",
  fechaRespuesta: "",
  radicadoSalida: "",
  validacionRespuesta: "",
  oficioAdicional: "",
  fallo1raInst: "",
  fechaFallo1raInst: "",
  observacionFallo1raInst: "",
  terminoCumplimiento1raInst: "",
  cumplimiento1raInst: "",
  fechaCumplimiento1raInst: "",
  impugnacionSDP: "",
  fechaImpugnacion: "",
  fallo2daInst: "",
  fechaFallo2daInst: "",
  observacionFallo2daInst: "",
  terminoCumplimiento2daInst: "",
  cumplimiento2daInst: "",
  fechaCumplimiento2daInst: "",
  incidenteDesacato: "",
  observacionesGenerales: "",
};
