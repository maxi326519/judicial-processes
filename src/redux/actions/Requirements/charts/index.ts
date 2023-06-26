import { ThunkAction } from "redux-thunk";
import {
  RequirementsCharts,
  initRequirementsCharts,
} from "../../../../interfaces/Requirements/charts";
import { RootState } from "../../../../interfaces/RootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export const SET_CHARTS = "SET_CHARTS";
export const GET_CHARTS = "GET_CHARTS";

const dataColl = collection(db, "Data");
const requirementsDoc = doc(dataColl, "Requirements");

export function setCharts(
  charts: RequirementsCharts
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await updateDoc(requirementsDoc, { charts });

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
      const snapshot = await getDoc(requirementsDoc);
      let charts = snapshot.data()?.charts;

      // If lists don't existe, create it
      if (!charts) {
        charts = { ...initRequirementsCharts };
        await updateDoc(requirementsDoc, { charts });
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
