export interface TutelaCharts {
  abogadosChart: AbogadosCharts[];
  TemaTutelaChart: TemaTutelaChart[];
  fallo1RaInstChart: Fallo1RaInstChart[];
  fallo2DaInstChart: Fallo1RaInstChart[];
}

export interface AbogadosCharts {
  name: string;
  types: Array<{
    label: string;
    quantity: number;
  }>;
}

export interface TemaTutelaChart {
  type: string;
  quantity: number;
}

export interface Fallo1RaInstChart {
  type: string;
  quantity: number;
}

export interface Fallo2DaInstChart {
  type: string;
  quantity: number;
}

export const initTutelaCharts: TutelaCharts = {
  abogadosChart: [],
  TemaTutelaChart: [],
  fallo1RaInstChart: [],
  fallo2DaInstChart: [],
};
