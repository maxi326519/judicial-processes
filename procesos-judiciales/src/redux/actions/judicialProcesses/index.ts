import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import { ProcessesDetails } from "../../../interfaces/JudicialProcesses";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const SET_PROCESSES = "SET_PROCESSES";
export const GET_PROCESSES = "GET_PROCESSES";
export const GET_PROCESSES_DETAILS = "GET_PROCESSES_DETAILS";
export const UPDATE_PROCESSES = "UPDATE_PROCESSES";
export const DELETE_PROCESSES = "DELETE_PROCESSES";

export function setProcesses(
  processes: ProcessesDetails
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const head = {
        idSiproj: processes.idSiproj,
        radRamaJudicialInicial: processes.radRamaJudicialInicial,
        radRamaJudicialActual: processes.radRamaJudicialActual,
        demandante: processes.demandante,
      };
      const details = processes;

      const colProcesses = collection(db, "Processes");
      const colDetails = collection(db, "Details");
      await setDoc(doc(colProcesses, processes.idSiproj.toString()), head);
      await setDoc(doc(colDetails, processes.idSiproj.toString()), details);

      dispatch({
        type: SET_PROCESSES,
        payload: { head, details },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getProcesses(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    const colProcesses = collection(db, "Processes");
    /*     await getDocs(query(colProcesses, where("firma", "==", user.name))); */
    const snapshot = await getDocs(colProcesses);

    let processes: any = [];
    snapshot.forEach((doc: any) => {
      processes.push(doc.data());
    });

    try {
      dispatch({
        type: GET_PROCESSES,
        payload: processes,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getProcessesDetails(
  idDetails: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    const colProcesses = collection(db, "Processes");
    const snapshot = await getDoc(doc(colProcesses, idDetails));

    try {
      dispatch({
        type: GET_PROCESSES_DETAILS,
        payload: snapshot.data(),
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateProcesses(
  processes: ProcessesDetails
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    const batch = writeBatch(db);

    const head = {
      idSiproj: processes.idSiproj,
      radRamaJudicialInicial: processes.radRamaJudicialInicial,
      radRamaJudicialActual: processes.radRamaJudicialActual,
      demandante: processes.demandante,
    };
    const details = { ...processes };

    const colProcesses = collection(db, "Processes");
    const colDetails = collection(db, "Details");
    batch.update(doc(colProcesses, processes.idSiproj.toString()), head);
    batch.update(doc(colDetails, processes.idSiproj.toString()), details);

    batch.commit();

    try {
      dispatch({
        type: UPDATE_PROCESSES,
        payload: { head, details },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteProcesses(
  processesId: number
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: DELETE_PROCESSES,
        payload: processesId,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
