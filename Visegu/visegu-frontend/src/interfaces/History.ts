export interface History {
  id?: string;
  date: string;
  type: HistoryType;
  StorageId?: string;
  UserId?: string;
  StockId?: string;
}

export enum HistoryType {
  entrada = "ENTRADA",
  salida = "SALIDA",
}

export interface HistoryFilters {
  type: string;
  user: string;
  storage: string;
}

export const initHistoryFilters = (): HistoryFilters => ({
  type: "",
  user: "",
  storage: "",
});
