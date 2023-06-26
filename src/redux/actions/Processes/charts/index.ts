import { ThunkAction } from "redux-thunk";
import { Charts, initCharts } from "../../../../interfaces/Processes/charts";
import { RootState } from "../../../../interfaces/RootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export const SET_CHARTS = "SET_CHARTS";
export const GET_CHARTS = "GET_CHARTS";

const dataColl = collection(db, "Data");
const processesDoc = doc(dataColl, "Processes");

export function setCharts(
  charts: Charts
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await updateDoc(processesDoc, { charts });

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
      const snapshot = await getDoc(processesDoc);
      let doc = snapshot.data();
      let charts = {};

      // If lists don't existe, create it
      console.log(doc);
      if (!doc) {
        charts = { ...initCharts };
        await setDoc(processesDoc, { charts });
      } else if (!charts) {
        charts = { ...initCharts };
        await updateDoc(processesDoc, { charts });
      } else {
        charts = doc.charts;
      }

      dispatch({
        type: GET_CHARTS,
        payload: charts,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
