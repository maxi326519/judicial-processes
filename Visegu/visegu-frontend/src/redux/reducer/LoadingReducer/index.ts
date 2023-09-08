import { AnyAction } from "redux";
import { CLOSE_LOADING, LOADING } from "../../actions/loading";

export const loadingReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case LOADING:
      return true;

    case CLOSE_LOADING:
      return false;

    default:
      return state;
  }
};
