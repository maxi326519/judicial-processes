import { ThunkAction } from "redux-thunk";
import { Users } from "../../../interfaces/users";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction, Dispatch } from "redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const SET_USER = "SET_USER";
export const GET_USER = "GET_USER";

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
