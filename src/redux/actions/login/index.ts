import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { auth } from "../../../firebase/config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { RootState } from "../../../interfaces/RootState";

export const LOGIN = "LOGIN";
export const LOG_OUT = "LOG_OUT";

export function logIn(
  user: any
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);

      dispatch({
        type: LOGIN,
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
        type: LOG_OUT,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
