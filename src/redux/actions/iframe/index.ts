import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction, Dispatch } from "redux";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { IFrames } from "../../../interfaces/iframes";

export const SET_IFRAME = "SET_IFRAME";
export const GET_IFRAME = "GET_IFRAME";
export const UPDATE_IFRAME = "UPDATE_IFRAME";
export const DELETE_IFRAME = "DELETE_IFRAME";

export function setIframe(
  iframe: IFrames
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const iframesCol = collection(db, "IFrames");
      const iframesDoc = doc(iframesCol);

      const newIframe = {
        ...iframe,
        id: iframesDoc.id,
      };

      await setDoc(iframesDoc, newIframe);

      dispatch({
        type: SET_IFRAME,
        payload: newIframe,
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

export function deleteIframe(
  idIframe: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const colProcesses = collection(db, "IFrames");
      await deleteDoc(doc(colProcesses, idIframe));

      dispatch({
        type: DELETE_IFRAME,
        payload: idIframe,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
