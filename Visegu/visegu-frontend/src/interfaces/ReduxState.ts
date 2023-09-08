import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export interface LoginState {}

export interface UsersState {}

export interface ProductsState {}

export interface StockState {}

export interface StorageState {}

export interface HistoryState {}

export interface RootState {
  loading: boolean;
  login: LoginState;
  users: UsersState;
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

export const initUsersState = (): UsersState => ({});

export const initProductsState = (): ProductsState => ({});

export const initStockState = (): StockState => ({});

export const initStorageState = (): StorageState => ({});

export const initHistoryState = (): HistoryState => ({});