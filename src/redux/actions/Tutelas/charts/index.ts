import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import {
  TutelaCharts,
  initTutelaCharts,
} from "../../../../interfaces/Tutelas/charts";

export const SET_TUTELAS_CHARTS = "SET_TUTELAS_CHARTS";
export const GET_TUTELAS_CHARTS = "GET_TUTELAS_CHARTS";

const dataColl = collection(db, "Data");
const tutelasDoc = doc(dataColl, "Tutelas");

export function setCharts(
  charts: TutelaCharts
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await updateDoc(tutelasDoc, { charts });

      dispatch({
        type: SET_TUTELAS_CHARTS,
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
      const snapshot = await getDoc(tutelasDoc);
      let doc = snapshot.data();
      let charts = doc?.charts;

      // If lists don't existe, create it
      if (!doc) {
        charts = { ...initTutelaCharts };
        await setDoc(tutelasDoc, { charts });
      } else if (!charts) {
        charts = { ...initTutelaCharts };
        await updateDoc(tutelasDoc, { charts });
      } else {
        charts = doc.charts;
      }

      dispatch({
        type: GET_TUTELAS_CHARTS,
        payload: charts,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
