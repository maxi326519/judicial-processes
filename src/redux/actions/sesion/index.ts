import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction, Dispatch } from "redux";
import { auth, db } from "../../../firebase/config";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { Users } from "../../../interfaces/users";
import {
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const UPDATE_EMAIL = "UPDATE_EMAIL";

export function logIn(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      if (!user.password) throw new Error("missing password");

      await signInWithEmailAndPassword(auth, user.email, user.password);

      const colUser = collection(db, "Users");
      const snapshot = await getDoc(doc(colUser, auth.currentUser?.uid));

      const currentUser = {
        ...snapshot.data(),
        id: snapshot.id,
      };

      dispatch({
        type: LOGIN,
        payload: currentUser,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function logOut(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await signOut(auth);
      dispatch({
        type: LOGOUT,
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
      dispatch({
        type: CHANGE_PASSWORD,
      });
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
