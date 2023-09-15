export interface Stock {
  id?: string;
  quantity: string;
  ProductId?: string;
  StorageId?: string;
}

export interface StockFilters {
  search: string;
  storage: string;
  category: string;
}

export const initStockFilters = (): StockFilters => ({
  search: "",
  storage: "",
  category: "",
});
