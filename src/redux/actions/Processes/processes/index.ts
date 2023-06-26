import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import {
  ProcessHeads,
  ProcessDetails,
} from "../../../../interfaces/Processes/data";
import {
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

export const SET_PROCESSES = "SET_PROCESSES";
export const IMPORT_PROCESSES = "IMPORT_PROCESSES";
export const GET_PROCESSES = "GET_PROCESSES";
export const GET_PROCESSES_DETAILS = "GET_PROCESSES_DETAILS";
export const GET_PROCESSES_DATA = "GET_PROCESSES_DATA";
export const UPDATE_PROCESSES = "UPDATE_PROCESSES";
export const DELETE_PROCESSES = "DELETE_PROCESSES";
export const DELETE_PROCESSES_DETAILS = "DELETE_PROCESSES_DETAILS";

const dataColl = collection(db, "Data");
const requirementsDoc = doc(dataColl, "Requirements");
const headColl = collection(requirementsDoc, "Head");
const detailsColl = collection(requirementsDoc, "Details");

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
        apoderadoActual: processes.apoderadoActual,
        radRamaJudicialInicial: processes.radRamaJudicialInicial,
        radRamaJudicialActual: processes.radRamaJudicialActual,
        demandante: processes.demandante,
      };
      let details: ProcessDetails = processes;

      batch.set(headDoc, head);
      batch.set(detailsDoc, details);

      await batch.commit();

      dispatch({
        type: SET_PROCESSES,
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
      apoderadoActual: details.apoderadoActual,
      radRamaJudicialInicial: details.radRamaJudicialInicial,
      radRamaJudicialActual: details.radRamaJudicialActual,
      demandante: details.demandante,
    };

    batch.update(doc(headColl, details.idSiproj.toString()), { ...head });
    batch.update(doc(detailsColl, details.idSiproj.toString()), { ...details });

    batch.commit();

    try {
      dispatch({
        type: UPDATE_PROCESSES,
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
        type: DELETE_PROCESSES,
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
            apoderadoActual: details.apoderadoActual,
            radRamaJudicialInicial: details.radRamaJudicialInicial,
            radRamaJudicialActual: details.radRamaJudicialActual,
            demandante: details.demandante,
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
        payload: processesList,
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
        type: GET_PROCESSES_DETAILS,
        payload: details,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
/* 
export function getProcessesData(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDocs(detailsColl);
      const data: any = [];

      snapshot.forEach((doc) => {
        data.push(doc.data());
      });

      dispatch({
        type: GET_PROCESSES_DATA,
        payload: data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
} */
