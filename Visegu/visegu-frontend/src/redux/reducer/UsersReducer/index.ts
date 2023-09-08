import { AnyAction } from "redux";
import { UsersState, initUsersState } from "../../../interfaces/ReduxState";

export const usersReducer = (state: UsersState  = initUsersState(), action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
