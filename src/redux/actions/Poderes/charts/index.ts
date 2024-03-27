import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  initPoderesChart,
  PoderesChart,
} from "../../../../interfaces/Poderes/chart";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { db } from "../../../../firebase/config";

export const SET_PODERES_CHARTS = "SET_PODERES_CHARTS";
export const GET_PODERES_CHARTS = "GET_PODERES_CHARTS";

const dataColl = collection(db, "Data");
const poderesDoc = doc(dataColl, "Poderes");

export function setCharts(
  charts: PoderesChart
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      console.log("details", charts);
      await updateDoc(poderesDoc, { charts });

      dispatch({
        type: SET_PODERES_CHARTS,
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
      const snapshot = await getDoc(poderesDoc);
      let doc = snapshot.data();
      let charts = doc?.charts;

      // If lists don't existe, create it
      if (!doc) {
        charts = initPoderesChart();
        await setDoc(poderesDoc, { charts });
      } else if (!charts) {
        charts = initPoderesChart();
        await updateDoc(poderesDoc, { charts });
      } else {
        charts = doc.charts;
      }

      dispatch({
        type: GET_PODERES_CHARTS,
        payload: charts,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
