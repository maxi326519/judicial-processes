import { AnyAction } from "redux";
import { Users } from "../../../interfaces/users";
import { initRootState } from "../../../interfaces/RootState";
import { LOGIN, LOGOUT, UPDATE_EMAIL } from "../../actions/sesion";

export const sesionReducer = (
  state: Users = { ...initRootState.sesion },
  action: AnyAction
) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;

    case LOGOUT:
      return { ...initRootState.sesion };

    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    default:
      return state;
  }
};
