import { AnyAction, Dispatch } from "redux";
import { MyThunkAction } from "../../../interfaces/ReduxState";
import { User } from "../../../interfaces/User";

export const SET_USER = "SET_USER";
export const GET_USERS = "GET_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export function setUser(user: User): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: SET_USER,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getUsers(): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: GET_USERS,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateUser(user: User): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: UPDATE_USER,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteUser(id: string): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: DELETE_USER,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
