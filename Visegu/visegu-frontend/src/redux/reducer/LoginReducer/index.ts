import { AnyAction } from "redux";
import { LoginState, initStockState } from "../../../interfaces/ReduxState";

export const loginReducer = (
  state: LoginState = initStockState(),
  action: AnyAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};
