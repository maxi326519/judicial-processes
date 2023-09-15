import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { User } from "./User";
import { StockFilters, initStockFilters } from "./Stock";
import { initHistoryFilters } from "./History";

export interface LoginState {}

export interface ProductsState {}

export interface StockState {
  data: [];
  filters: StockFilters;
}

export interface StorageState {}

export interface HistoryState {}

export interface RootState {
  loading: boolean;
  login: LoginState;
  users: User[];
  products: ProductsState;
  stock: StockState;
  storage: StorageState;
  history: HistoryState;
}

export type MyThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
>;

export const initLoginState = (): LoginState => ({});

export const initUsersState = () => [];

export const initProductsState = (): ProductsState => [];

export const initStockState = (): StockState => ({
  data: [],
  filters: initStockFilters(),
});

export const initStorageState = (): StorageState => [];

export const initHistoryState = (): HistoryState => ({
  data: [],
  filters: initHistoryFilters(),
});
