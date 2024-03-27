export interface PoderesChart {
  concepto: ConceptoChart;
  radicado: RadicadoChart;
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
  concepto: initConceptoChart(),
  radicado: initRadicadoChart(),
});

export const initConceptoChart = (): ConceptoChart => ({
  name: "",
  types: [],
});

export const initRadicadoChart = (): RadicadoChart => ({
  type: "",
  quantity: 0,
});
