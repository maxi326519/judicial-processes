import { ThunkAction } from "redux-thunk";
import { Users } from "../../../interfaces/users";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction, Dispatch } from "redux";
import {
  createUserWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export const SET_USER = "SET_USER";
export const GET_USER = "GET_USER";
export const GET_USER_DATA = "GET_USER_DATA";
export const UPDATE_EMAIL = "UPDATE_EMAIL";

export function setUser(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);
      const userCol = collection(db, "Users");
      const listCol = collection(db, "List");
      const listsDoc = doc(listCol, "lists");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password!
      );

      const newUser = {
        ...user,
        id: userCredential.user.uid,
      };

      batch.set(doc(userCol, newUser.id), user);
      batch.update(listsDoc, { apoderados: arrayUnion(user.name) });

      await batch.commit();

      dispatch({
        type: SET_USER,
        payload: newUser,
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
  newPassword: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      if (!auth.currentUser) throw new Error("No existe el usuario");
      await updatePassword(auth.currentUser, newPassword);
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function changeEmail(
  newEmail: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      if (!auth.currentUser) throw new Error("No existe el usuario");
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
