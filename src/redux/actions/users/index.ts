import { ThunkAction } from "redux-thunk";
import { Users } from "../../../interfaces/users";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction, Dispatch } from "redux";
import {
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db, functions } from "../../../firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { httpsCallable } from "@firebase/functions";

export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const GET_USER = "GET_USER";
export const GET_USER_DATA = "GET_USER_DATA";
export const UPDATE_EMAIL = "UPDATE_EMAIL";

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
            ...user,
          };
          console.log(newUser);
        })
        .catch((error: any) => {
          const code = error.code;
          const message = error.message;
          const details = error.details;
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

export function updateUser(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const updateUser = httpsCallable(functions, "updateUser");
      await updateUser(user).catch((error: any) => {
        const code = error.code;
        const message = error.message;
        const details = error.details;
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
        const code = error.code;
        const message = error.message;
        const details = error.details;
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

export function getUserData(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const colUser = collection(db, "Users");
      const snapshot = await getDoc(doc(colUser, auth.currentUser?.uid));

      const user = {
        ...snapshot.data(),
        id: snapshot.id,
      };

      dispatch({
        type: GET_USER_DATA,
        payload: user,
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
        user.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      dispatch({
        type: GET_USER,
        payload: user,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function changePassword(
  newPassword: string,
  curretnPassword: string,
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      if (!auth.currentUser) throw new Error("No existe el usuario");
      await signInWithEmailAndPassword(auth, user.email, curretnPassword);
      await updatePassword(auth.currentUser, newPassword);
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function changeEmail(
  newEmail: string,
  curretnPassword: string,
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      if (!auth.currentUser) throw new Error("No existe el usuario");
      await signInWithEmailAndPassword(auth, user.email, curretnPassword);
      await updateEmail(auth.currentUser, newEmail);
      const userCol = collection(db, "Users");
      const userDoc = doc(userCol, auth.currentUser.uid);

      updateDoc(userDoc, { email: newEmail });

      dispatch({
        type: UPDATE_EMAIL,
        payload: newEmail,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
