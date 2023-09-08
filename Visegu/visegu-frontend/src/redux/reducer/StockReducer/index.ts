import { AnyAction } from "redux";
import { StockState, initStockState } from "../../../interfaces/ReduxState";

export const stockReducer = (state: StockState  = initStockState(), action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
