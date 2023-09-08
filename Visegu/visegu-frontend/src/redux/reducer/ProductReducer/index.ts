import { AnyAction } from "redux";
import { ProductsState, initStockState } from "../../../interfaces/ReduxState";

export const productReducer = (state: ProductsState  = initStockState(), action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
