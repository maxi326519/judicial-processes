import { AnyAction } from "redux";
import { Users } from "../../../interfaces/users";
import { initRootState } from "../../../interfaces/RootState";
import {
  DELETE_USER,
  GET_USERS,
  SET_USER,
  UPDATE_USER,
} from "../../actions/users";

export const usersReducer = (
  state: Users[] = { ...initRootState.users },
  action: AnyAction
) => {
  switch (action.type) {
    case SET_USER:
      return [...state, action.payload];

    case UPDATE_USER:
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );

    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);

    case GET_USERS:
      return action.payload;

    default:
      return state;
  }
};
