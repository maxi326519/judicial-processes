export interface PoderesChart {
  abogados: AbogadosCharts[];
  concepto: ConceptoChart[];
  radicado: RadicadoChart[];
}

export interface AbogadosCharts {
  name: string;
  types: Array<{
    label: string;
    quantity: number;
  }>;
}

export interface ConceptoChart {
  name: string;
  types: Array<{
    label: string;
    quantity: number;
  }>;
}

export interface RadicadoChart {
  type: string;
  quantity: number;
}

export const initPoderesChart = (): PoderesChart => ({
  abogados: [],
  concepto: [],
  radicado: [],
});

export const initConceptoChart = (): ConceptoChart => ({
  name: "",
  types: [],
});

export const initRadicadoChart = (): RadicadoChart => ({
  type: "",
  quantity: 0,
});
