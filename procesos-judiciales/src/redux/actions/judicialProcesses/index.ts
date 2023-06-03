import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import {
  JudicialProcesses,
  ProcessesDetails,
} from "../../../interfaces/JudicialProcesses";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const SET_PROCESSES = "SET_PROCESSES";
export const IMPORT_PROCESSES = "IMPORT_PROCESSES";
export const GET_PROCESSES = "GET_PROCESSES";
export const GET_PROCESSES_DETAILS = "GET_PROCESSES_DETAILS";
export const UPDATE_PROCESSES = "UPDATE_PROCESSES";
export const DELETE_PROCESSES = "DELETE_PROCESSES";

export function setProcesses(
  processes: ProcessesDetails
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      let head: JudicialProcesses = {
        idSiproj: processes.idSiproj,
        radRamaJudicialInicial: processes.radRamaJudicialInicial,
        radRamaJudicialActual: processes.radRamaJudicialActual,
        demandante: processes.demandante,
      };
      let details: ProcessesDetails = processes;

      const colProcesses = collection(db, "Processes");
      const colDetails = collection(db, "Details");

      const headDoc = doc(colProcesses);
      const detailsDoc = doc(colDetails);

      head.id = headDoc.id;
      head.idDetails = detailsDoc.id;
      details.id = detailsDoc.id;

      batch.set(headDoc, head);
      batch.set(detailsDoc, details);

      await batch.commit();

      dispatch({
        type: SET_PROCESSES,
        payload: { head, details },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function importProcesses(processesList: {
  head: JudicialProcesses[];
  details: ProcessesDetails[];
}): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      processesList.details.forEach((details: ProcessesDetails) => {
        let head: JudicialProcesses = {
          idSiproj: details.idSiproj,
          radRamaJudicialInicial: details.radRamaJudicialInicial,
          radRamaJudicialActual: details.radRamaJudicialActual,
          demandante: details.demandante,
        };
        let detailsData = details;

        const colProcesses = collection(db, "Processes");
        const colDetails = collection(db, "Details");

        const headDoc = doc(colProcesses);
        const detailsDoc = doc(colDetails);

        head.id = headDoc.id;
        head.idDetails = detailsDoc.id;
        detailsData.id = detailsDoc.id;

        batch.set(headDoc, head);
        batch.set(detailsDoc, details);
      });

      await batch.commit();

      dispatch({
        type: IMPORT_PROCESSES,
        payload: processesList,
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
  processes: JudicialProcesses
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      const colProcesses = collection(db, "Processes");
      const colDetails = collection(db, "Details");

      console.log(colProcesses);
      console.log(colDetails);
      console.log(processes);

      batch.delete(doc(colProcesses, processes.id));
      batch.delete(doc(colDetails, processes.idDetails));

      await batch.commit();

      dispatch({
        type: DELETE_PROCESSES,
        payload: processes.id,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
