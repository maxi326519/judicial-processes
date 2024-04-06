import { GET_HISTORY_USER, UPDATE_HISTORY_USER } from "../../actions/history";
import { HistoryData, initHistoryData } from "../../../interfaces/history";
import { AnyAction } from "redux";
import { LOGOUT } from "../../actions/sesion";

export const historyReducer = (
  state: HistoryData = initHistoryData(),
  action: AnyAction
) => {
  switch (action.type) {
    case GET_HISTORY_USER:
      return action.payload;

    case UPDATE_HISTORY_USER:
      return action.payload;

    case LOGOUT:
      return initHistoryData();

    default:
      return state;
  }
};
