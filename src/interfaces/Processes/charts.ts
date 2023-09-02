export interface Charts {
  entityChart: EntityChartData[];
  processesChart: ProcessesChartData[];
  typeChart: TypeChartData[];
}

export interface EntityChartData {
  posicion: string;
  demandado: number;
  demandante: number;
}

export interface ProcessesChartData {
  posicion: string;
  data: Array<{
    apoderado: string;
    activos: number;
    terminados: number;
  }>;
}

export interface TypeChartData {
  posicion: string;
  data: Array<{
    tipo: string;
    cantidad: number;
  }>;
}

export const initCharts = {
  entityChart: [],
  processesChart: [],
  typeChart: [],
};
