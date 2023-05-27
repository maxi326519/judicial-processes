import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction, Dispatch } from "redux";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { IFrames } from "../../../interfaces/iframes";

export const SET_IFRAME = "SET_IFRAME";
export const GET_IFRAME = "GET_IFRAME";
export const UPDATE_IFRAME = "UPDATE_IFRAME";

export function setIframe(
  iframe: IFrames
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const colIframes = collection(db, "IFrames");
      const snapshot = await addDoc(colIframes, iframe);

      dispatch({
        type: SET_IFRAME,
        payload: { id: snapshot.id, ...iframe },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getIframe(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const colProcesses = collection(db, "IFrames");
      const snapshot = await getDocs(colProcesses);

      let iframes: any = [];
      snapshot.forEach((doc: any) => {
        iframes.push(doc.data());
      });

      dispatch({
        type: GET_IFRAME,
        payload: iframes,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateIframe(
  iframe: IFrames
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const colProcesses = collection(db, "IFrames");
      await updateDoc(doc(colProcesses, iframe.id), {
        ...iframe,
      });

      dispatch({
        type: UPDATE_IFRAME,
        payload: iframe,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
