export interface RequirementsCharts {
  abogado: AbogadoChart[];
  tipo: TipoChart[];
  remitente: RemitenteGeneralChart[];
}

export interface AbogadoChart {
  abogado: string;
  activos: number;
  terminados: number;
}

export interface TipoChart {
  tipo: string;
  cantidad: number;
}

export interface RemitenteGeneralChart {
  remitente: string;
  cantidad: number;
}

export const initRequirementsCharts = (): RequirementsCharts => ({
  abogado: [],
  tipo: [],
  remitente: [],
});
