import { AnyAction } from "redux";
import { HistoryState, initHistoryState } from "../../../interfaces/ReduxState";

export const historyReducer = (state: HistoryState = initHistoryState(), action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
