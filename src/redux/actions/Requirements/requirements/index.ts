import { AnyAction } from "redux";
import {
  RequirementsDetail,
  RequirementsHeads,
} from "../../../../interfaces/Requirements/data";
import { RootState } from "../../../../interfaces/RootState";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "react";
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

export const SET_REQUIREMENTS = "SET_REQUIREMENTS";
export const GET_REQUIREMENTS = "GET_REQUIREMENTS";
export const UPDATE_REQUIREMENTS = "UPDATE_REQUIREMENTS";
export const DELETE_REQUIREMENTS = "DELETE_REQUIREMENTS";

export const GET_REQUIREMENTS_DETAILS = "GET_REQUIREMENTS_DETAILS";
export const IMPORT_REQUIREMENTS = "IMPORT_REQUIREMENTS";
export const CLEAR_ALL_REQUIREMENTS = "CLEAR_ALL_REQUIREMENTS";

const dataColl = collection(db, "Data");
const requirementsDoc = doc(dataColl, "Requirements");
const headColl = collection(requirementsDoc, "Head");
const detailsColl = collection(requirementsDoc, "Details");

export function setRequirements(
  requiriments: RequirementsDetail
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      const headDoc = doc(headColl, requiriments.idSiproj.toString());
      const detailsDoc = doc(detailsColl, requiriments.idSiproj.toString());

      const data = await getDoc(headDoc);
      if (data.exists())
        throw new Error(`Ya existe el id ${requiriments.idSiproj}`);

      let head: RequirementsHeads = {
        idSiproj: requiriments.idSiproj,
      };
      let details: RequirementsDetail = requiriments;

      batch.set(headDoc, head);
      batch.set(detailsDoc, details);

      await batch.commit();

      dispatch({
        type: SET_REQUIREMENTS,
        payload: head,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getRequirements(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    let requiriments: any = [];
    let snapshot;

    if (user.rol === UserRol.Admin) {
      snapshot = await getDocs(headColl);
    } else if (user.rol === UserRol.User) {
      snapshot = await getDocs(
        query(headColl, where("abogado", "==", user.name))
      );
    }

    if (snapshot) {
      snapshot.forEach((doc: any) => {
        requiriments.push(doc.data());
      });
    }

    try {
      dispatch({
        type: GET_REQUIREMENTS,
        payload: requiriments,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getDetails(
  idSiproj: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(doc(detailsColl, idSiproj));
      let details: any = snapshot.data();

      dispatch({
        type: GET_REQUIREMENTS_DETAILS,
        payload: details,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateRequirements(
  requiriments: RequirementsDetail
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    const batch = writeBatch(db);

    const head: RequirementsHeads = { idSiproj: requiriments.idSiproj };
    const details: RequirementsDetail = { ...requiriments };

    batch.update(doc(headColl, details.idSiproj.toString()), { ...head });
    batch.update(doc(detailsColl, details.idSiproj.toString()), { ...details });

    batch.commit();

    try {
      dispatch({
        type: UPDATE_REQUIREMENTS,
        payload: head,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteRequirements(
  requirimentsId: number
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      batch.delete(doc(headColl, requirimentsId.toString()));
      batch.delete(doc(detailsColl, requirimentsId.toString()));

      await batch.commit();

      dispatch({
        type: DELETE_REQUIREMENTS,
        payload: requirimentsId,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function importRequirements(
  details: RequirementsDetail[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);
      let row = 0;
      let heads: RequirementsHeads[] = [];

      try {
        details.forEach((details: RequirementsDetail) => {
          row++;

          let head: RequirementsHeads = { idSiproj: details.idSiproj };
          heads.push(head);

          const headDoc = doc(headColl, details.idSiproj.toString());
          const detailsDoc = doc(detailsColl, details.idSiproj.toString());

          batch.set(headDoc, head);
          batch.set(detailsDoc, details);
        });
      } catch (error) {
        console.log(error);
        throw new Error(`Hubo un error en la fila ${row} `);
      }

      await batch.commit();

      dispatch({
        type: IMPORT_REQUIREMENTS,
        payload: heads,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function clearAllRequirements(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);
      const snapshot = await getDocs(headColl);

      snapshot.forEach((head) => {
        batch.delete(doc(headColl, head.id));
        batch.delete(doc(detailsColl, head.id));
      });

      await batch.commit();

      dispatch({
        type: CLEAR_ALL_REQUIREMENTS,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
