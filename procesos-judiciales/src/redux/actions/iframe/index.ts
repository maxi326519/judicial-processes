import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction, Dispatch } from "redux";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const SET_IFRAME = "SET_IFRAME";
export const GET_IFRAME = "GET_IFRAME";

export function setIframe(
  iframe: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const colUser = collection(db, "IFrames");
      const response = await setDoc(doc(colUser), { data: iframe });

      console.log(response);

      dispatch({
        type: SET_IFRAME,
        payload: iframe,
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
