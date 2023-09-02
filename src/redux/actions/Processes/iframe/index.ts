import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import { IFrames } from "../../../../interfaces/iframes";
import { AnyAction, Dispatch } from "redux";
import { db } from "../../../../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const SET_PROCESS_IFRAME = "SET_PROCESS_IFRAME";
export const GET_PROCESS_IFRAMES = "GET_PROCESS_IFRAMES";
export const UPDATE_PROCESS_IFRAME = "UPDATE_PROCESS_IFRAME";
export const DELETE_PROCESS_IFRAME = "DELETE_PROCESS_IFRAME";

const dataColl = collection(db, "Data");
const processesDoc = doc(dataColl, "Processes");
const iframesColl = collection(processesDoc, "Iframes");

export function setIframe(
  iframe: IFrames
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const newIframe = await addDoc(iframesColl, { ...iframe });

      dispatch({
        type: SET_PROCESS_IFRAME,
        payload: {
          id: newIframe.id,
          ...iframe,
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getIframes(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDocs(iframesColl);

      let iframes: any = [];
      snapshot.forEach((doc) => {
        iframes.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      dispatch({
        type: GET_PROCESS_IFRAMES,
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
      await updateDoc(doc(iframesColl, iframe.id), {
        ...iframe,
      });

      dispatch({
        type: UPDATE_PROCESS_IFRAME,
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
      await deleteDoc(doc(iframesColl, idIframe));

      dispatch({
        type: DELETE_PROCESS_IFRAME,
        payload: idIframe,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
