export interface Charts {
  entityChart: EntityChartData;
  processesChart: ProcessesChartData[];
  stageChart: StageChartData[];
  typeChart: TypeChartData[];
}

export interface EntityChartData {
  demandado: number;
  demandante: number;
}

export interface ProcessesChartData {
  apoderado: string;
  activos: number;
  terminados: number;
}

export interface StageChartData {
  etapa: string;
  cantidad: number;
}

export interface TypeChartData {
  tipo: string;
  cantidad: number;
}

export const initEntity = {
  demandado: 0,
  demandante: 0,
}

export const initCharts = {
  entityChart: {
    demandado: 0,
    demandante: 0,
  },
  processesChart: [],
  stageChart: [],
  typeChart: [],
};
