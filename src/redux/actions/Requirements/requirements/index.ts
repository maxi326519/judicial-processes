import { AnyAction } from "redux";
import { RootState } from "../../../../interfaces/RootState";
import { ThunkAction } from "redux-thunk";
import { UserRol, Users } from "../../../../interfaces/users";
import { Dispatch } from "react";
import { db } from "../../../../firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  RequirementsDetail,
  RequirementsHeads,
} from "../../../../interfaces/Requirements/data";
import getDateOrNull from "../../../../functions/getDateOrNull";

export const SET_REQUIREMENTS = "SET_REQUIREMENTS";
export const GET_REQUIREMENTS = "GET_REQUIREMENTS";
export const UPDATE_REQUIREMENTS = "UPDATE_REQUIREMENTS";
export const DELETE_REQUIREMENTS = "DELETE_REQUIREMENTS";

export const GET_REQUIREMENTS_DETAILS = "GET_REQUIREMENTS_DETAILS";
export const DELETE_REQUIREMENTS_DETAILS = "DELETE_REQUIREMENTS_DETAILS";

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

      // Firestore collections
      const headDoc = doc(headColl);
      const detailsDoc = doc(detailsColl, headDoc.id);

      // Create data to save
      let head: RequirementsHeads = {
        radicadoSipa: requiriments.radicadoSipa,
        abogado: requiriments.abogado,
        tipoProceso: requiriments.tipoProceso,
        numeroProceso: requiriments.numeroProceso,
      };
      let details: RequirementsDetail = requiriments;

      // Add data to save
      batch.set(headDoc, head);
      batch.set(detailsDoc, details);

      // Post data
      await batch.commit();

      // Add id to save
      head.id = headDoc.id;

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
    // Create variables to use
    let requiriments: any = []; // Save snapshot data
    let snapshot; // Save the snapshot

    // Check user rol, and get docs
    if (user.rol === UserRol.Admin) {
      // if user is admin, get all docs
      snapshot = await getDocs(headColl);
    } else if (user.rol === UserRol.User) {
      // if user is not admin, get only her docs
      snapshot = await getDocs(
        query(headColl, where("abogado", "==", user.name))
      );
    }

    // Save doc data
    if (snapshot) {
      snapshot.forEach((doc) => {
        requiriments.push({
          ...doc.data(),
          id: doc.id,
        });
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

export function getRequirementsDetails(
  id: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Get doc
      const snapshot = await getDoc(doc(detailsColl, id.toString()));

      // Save doc data
      const data: any = snapshot.data() as RequirementsDetail;
      const details: RequirementsDetail = {
        ...(snapshot.data() as RequirementsDetail),
        id: id,
        fechaNotificacion: getDateOrNull(data.fechaNotificacion),
        fechaVencimiento: getDateOrNull(data.fechaVencimiento),
        fechaRespuesta: getDateOrNull(data.fechaRespuesta),
      };

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

    // Create the new docs data
    let head: RequirementsHeads = {
      radicadoSipa: requiriments.radicadoSipa,
      abogado: requiriments.abogado,
      tipoProceso: requiriments.tipoProceso,
      numeroProceso: requiriments.numeroProceso,
    };
    let { id, ...details }: RequirementsDetail = requiriments;

    // Set updata data
    batch.update(doc(headColl, id!.toString()), { ...head });
    batch.update(doc(detailsColl, id!.toString()), { ...details });

    // Update
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
  id: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      // Set delete
      batch.delete(doc(headColl, id.toString()));
      batch.delete(doc(detailsColl, id.toString()));

      // Delete
      await batch.commit();

      dispatch({
        type: DELETE_REQUIREMENTS,
        payload: id,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteRequirementsDetails() {
  return {
    type: DELETE_REQUIREMENTS_DETAILS,
  };
}

export function importRequirements(
  details: RequirementsDetail[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      let batch = writeBatch(db);
      let row = 0; // Save the current row to return the error
      let counter = 0; // Count docs amounts
      let heads: RequirementsHeads[] = []; // Save de new heads docs to return

      try {
        for (const detail of details) {
          row++;
          counter++;

          // Create the new docs data
          let head: RequirementsHeads = {
            radicadoSipa: detail.radicadoSipa,
            abogado: detail.abogado,
            tipoProceso: detail.tipoProceso,
            numeroProceso: detail.numeroProceso,
          };

          // Firestore collections
          const headDoc = doc(headColl);
          const detailsDoc = doc(detailsColl, headDoc.id);

          // Set data
          batch.set(headDoc, head);
          batch.set(detailsDoc, detail);

          // Set only 500 docs, leter post de batch an reset them
          if (counter >= 250) {
            await batch.commit();
            batch = writeBatch(db);
            counter = 0;
          }

          // Add data to Redux
          heads.push({
            ...head,
            id: headDoc.id,
          });
        }
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
      // Create the batch
      const batch = writeBatch(db);

      // Get all docs to delete
      const snapshot = await getDocs(headColl);

      // Add deletes to batch
      snapshot.forEach((data) => {
        batch.delete(doc(headColl, data.id));
        batch.delete(doc(detailsColl, data.id));
      });

      // Delete docs
      await batch.commit();

      dispatch({
        type: CLEAR_ALL_REQUIREMENTS,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
