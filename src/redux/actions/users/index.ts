import { collection, getDocs } from "firebase/firestore";
import { AnyAction, Dispatch } from "redux";
import { db, functions } from "../../../firebase/config";
import { httpsCallable } from "@firebase/functions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import { Users } from "../../../interfaces/users";

export const SET_USER = "SET_USER";
export const GET_USERS = "GET_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export function setUser(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      let newUser = null;

      const setNewUser = httpsCallable(functions, "setNewUser");
      await setNewUser(user)
        .then((result: any) => {
          newUser = {
            id: result.data.uid,
            name: user.name,
            email: user.email,
            rol: user.rol,
            permissions: user.permissions,
          };
        })
        .catch((error: any) => {
          const message = error.message;
          throw new Error(message);
        });

      dispatch({
        type: SET_USER,
        payload: newUser,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getUsers(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const colUser = collection(db, "Users");
      const snapshot = await getDocs(colUser);
      let user: any = [];

      snapshot.forEach((doc) => {
        let currentUser = doc.data();

        // Set id
        currentUser.id = doc.id;

        // Change dates from Timestamp type to Date type
        if (currentUser.available) {
          currentUser.available.startDate =
            currentUser.available.startDate?.toDate();

          currentUser.available.endDate =
            currentUser.available.endDate?.toDate();

          // Check users availables
          if (currentUser.available.endDate < new Date()) {
            currentUser.available = false;
          }
        }

        // Save current user
        user.push(currentUser);
      });

      dispatch({
        type: GET_USERS,
        payload: user,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateUser(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const updateUser = httpsCallable(functions, "updateUser");
      await updateUser(user).catch((error: any) => {
        const message = error.message;
        throw new Error(message);
      });

      dispatch({
        type: UPDATE_USER,
        payload: user,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteUser(
  id: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const deleteUser = httpsCallable(functions, "deleteUser");
      await deleteUser({ uid: id }).catch((error: any) => {
        const message = error.message;
        throw new Error(message);
      });

      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
