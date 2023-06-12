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
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password!
      );

      const newUser = {
        ...user,
        id: userCredential.user.uid,
      };

      const colUser = collection(db, "Users");
      await setDoc(doc(colUser, newUser.id), newUser);

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

      dispatch({
        type: GET_USER_DATA,
        payload: snapshot.data(),
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

      snapshot.forEach((doc: any) => {
        user.push(doc.data());
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
