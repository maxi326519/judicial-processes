import { ThunkAction } from "redux-thunk";
import { Charts } from "../../../interfaces/charts";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const SET_CHARTS = "SET_CHARTS";
export const GET_CHARTS = "GET_CHARTS";

export function setCharts(
  charts: Charts
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const chartsCol = collection(db, "Chart");
      const chartsDoc = doc(chartsCol, "charts");

      await setDoc(chartsDoc, charts);

      dispatch({
        type: SET_CHARTS,
        payload: charts,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getCharts(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const chartsCol = collection(db, "Chart");
      const chartsDoc = doc(chartsCol, "charts");

      const snapshot = await getDoc(chartsDoc);

      const charts = snapshot.data();

      dispatch({
        type: GET_CHARTS,
        payload: charts,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
