import { ThunkAction } from "redux-thunk";
import { Users } from "../../../interfaces/users";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction, Dispatch } from "redux";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";

export const SET_USER = "SET_USER";
export const GET_USER = "GET_USER";
export const GET_USER_DATA = "GET_USER_DATA";
export const PERSISTENCE = "PERSISTENCE";
export const LOG_OUT = "LOG_OUT";

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

/* export function changePassword(): ThunkAction<
Promise<void>,
RootState,
null,
AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      console.log(auth, auth.currentUser.email);
      await sendPasswordResetEmail(auth, auth.currentUser.email);
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

export function changeEmail(newEmail, ruc): ThunkAction<
Promise<void>,
RootState,
null,
AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await updateEmail(auth.currentUser, newEmail);
      await sendEmailVerification(auth.currentUser);
      const userRef = ref(db, `users/${auth.currentUser.uid}/profile`);
      const authRef = ref(db, `auth/${ruc}`);
      await update(userRef, { EMP_EMAIL: newEmail });
      await update(authRef, { EMAIL: newEmail });

      dispatch({
        type: UPDATE_EMAIL,
        payload: newEmail,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
 */
