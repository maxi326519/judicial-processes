import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import {
  ProcessHeads,
  ProcessDetails,
} from "../../../../interfaces/Processes/data";
import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { UserRol, Users } from "../../../../interfaces/users";

export const SET_PROCESS = "SET_PROCESS";
export const GET_PROCESSES = "GET_PROCESSES";
export const DELETE_PROCESS = "DELETE_PROCESS";

export const GET_PROCESS_DETAILS = "GET_PROCESSES_DETAILS";
export const UPDATE_PROCESS_DETAILS = "UPDATE_PROCESSES_DETAILS";
export const DELETE_PROCESS_DETAILS = "DELETE_PROCESS_DETAILS";
export const IMPORT_PROCESSES = "IMPORT_PROCESSES";
export const CLEAR_ALL_PROCESSES = "CLEAR_ALL_PROCESSES";

const dataColl = collection(db, "Data");
const processesDoc = doc(dataColl, "Processes");
const headColl = collection(processesDoc, "Head");
const detailsColl = collection(processesDoc, "Details");

export function setProcesses(
  processes: ProcessDetails
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      const headDoc = doc(headColl, processes.idSiproj.toString());
      const detailsDoc = doc(detailsColl, processes.idSiproj.toString());

      const data = await getDoc(headDoc);
      if (data.exists())
        throw new Error(`Ya existe el id ${processes.idSiproj}`);

      let head: ProcessHeads = {
        idSiproj: processes.idSiproj,
        estado: processes.estado,
        tipoProceso: processes.tipoProceso,
        apoderadoActual: processes.apoderadoActual,
        radRamaJudicialInicial: processes.radRamaJudicialInicial,
        radRamaJudicialActual: processes.radRamaJudicialActual,
        demandante: processes.demandante,
        posicionSDP: processes.posicionSDP,
      };
      let details: ProcessDetails = processes;

      batch.set(headDoc, head);
      batch.set(detailsDoc, details);

      await batch.commit();

      dispatch({
        type: SET_PROCESS,
        payload: head,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getProcesses(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    let processes: any = [];
    let snapshot;

    if (user.rol === UserRol.Admin) {
      snapshot = await getDocs(headColl);
    } else if (user.rol === UserRol.User) {
      snapshot = await getDocs(
        query(headColl, where("apoderadoActual", "==", user.name))
      );
    }

    if (snapshot) {
      snapshot.forEach((doc: any) => {
        processes.push(doc.data());
      });
    }

    console.log(snapshot?.size);
    console.log(processes);

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

export function updateProcesses(
  details: ProcessDetails
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    const batch = writeBatch(db);

    const head: ProcessHeads = {
      idSiproj: details.idSiproj,
      estado: details.estado,
      tipoProceso: details.tipoProceso,
      apoderadoActual: details.apoderadoActual,
      radRamaJudicialInicial: details.radRamaJudicialInicial,
      radRamaJudicialActual: details.radRamaJudicialActual,
      demandante: details.demandante,
      posicionSDP: details.posicionSDP,
    };

    batch.update(doc(headColl, details.idSiproj.toString()), { ...head });
    batch.update(doc(detailsColl, details.idSiproj.toString()), { ...details });

    batch.commit();

    try {
      dispatch({
        type: UPDATE_PROCESS_DETAILS,
        payload: head,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteProcesses(
  processes: ProcessHeads
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      const colProcesses = collection(db, "Processes");
      const colDetails = collection(db, "Details");

      batch.delete(doc(colProcesses, processes.idSiproj.toString()));
      batch.delete(doc(colDetails, processes.idSiproj.toString()));

      await batch.commit();

      dispatch({
        type: DELETE_PROCESS,
        payload: processes.idSiproj,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function importProcesses(processesList: {
  head: ProcessHeads[];
  details: ProcessDetails[];
}): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);
      let row = 0;

      try {
        processesList.details.forEach((details: ProcessDetails) => {
          row++;

          let head: ProcessHeads = {
            idSiproj: details.idSiproj,
            estado: details.estado,
            tipoProceso: details.tipoProceso,
            apoderadoActual: details.apoderadoActual,
            radRamaJudicialInicial: details.radRamaJudicialInicial,
            radRamaJudicialActual: details.radRamaJudicialActual,
            demandante: details.demandante,
            posicionSDP: details.posicionSDP,
          };
          let detailsData = details;

          const headDoc = doc(headColl, details.idSiproj.toString());
          const detailsDoc = doc(detailsColl, details.idSiproj.toString());

          batch.set(headDoc, head);
          batch.set(detailsDoc, detailsData);
        });
      } catch (error) {
        console.log(error);
        throw new Error(`Hubo un error en la fila ${row} `);
      }

      await batch.commit();

      dispatch({
        type: IMPORT_PROCESSES,
        payload: processesList.head,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getProcessDetails(
  idSiproj: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(doc(detailsColl, idSiproj));

      let details: any = snapshot.data();
      details = {
        ...details,
        fechaNotificacion: details.fechaNotificacion
          ? details.fechaNotificacion.toDate()
          : null,
        fechaAdmision: details.fechaAdmision
          ? details.fechaAdmision.toDate()
          : null,
        fechaContestacion: details.fechaContestacion
          ? details.fechaContestacion.toDate()
          : null,
        fechaLimiteProbContestacion: details.fechaLimiteProbContestacion
          ? details.fechaLimiteProbContestacion.toDate()
          : null,
        fechaProceso: details.fechaProceso
          ? details.fechaProceso.toDate()
          : null,
        fechaFalloPrimeraInstancia: details.fechaFalloPrimeraInstancia
          ? details.fechaFalloPrimeraInstancia.toDate()
          : null,
        fechaPresentacionRecurso: details.fechaPresentacionRecurso
          ? details.fechaPresentacionRecurso.toDate()
          : null,
        fechaFalloSegundaInstancia: details.fechaFalloSegundaInstancia
          ? details.fechaFalloSegundaInstancia.toDate()
          : null,
        fechaTerminacion: details.fechaTerminacion
          ? details.fechaTerminacion.toDate()
          : null,
      };

      console.log(details);

      dispatch({
        type: GET_PROCESS_DETAILS,
        payload: details,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteProcessDetails() {
  return {
    type: DELETE_PROCESS_DETAILS,
  };
}

export function clearAllProcesses(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Get data
      const headSnap = await getDocs(headColl);
      const detailSnap = await getDocs(detailsColl);

      // Save id's in variable
      let refList: DocumentReference[] = [];
      headSnap.forEach((head) => refList.push(head.ref));
      detailSnap.forEach((detail) => refList.push(detail.ref));

      // Create counter for batch limite, an the batch
      let counter = 0;
      let batch = writeBatch(db);

      // Iterate the refs and add to batch
      for (const ref of refList) {
        batch.delete(ref);
        batch.delete(ref);
        counter++;

        // if batch limit is reached, commit them, create other batch, and set counter in 0
        if (counter >= 240) {
          await batch.commit();
          batch = writeBatch(db);
          counter = 0;
        }
      }

      await batch.commit();

      dispatch({
        type: CLEAR_ALL_PROCESSES,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
