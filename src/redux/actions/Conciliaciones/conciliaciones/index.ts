import { UserRol, Users } from "../../../../interfaces/users";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { db } from "../../../../firebase/config";
import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  Conciliaciones,
  ConciliacionesHeads,
} from "../../../../interfaces/Conciliaciones/data";
import getDateOrNull from "../../../../functions/getDateOrNull";

export const SET_CONCILIACIONES = "SET_CONCILIACIONES";
export const GET_CONCILIACIONES = "GET_CONCILIACIONES";
export const UPDATE_CONCILIACIONES = "UPDATE_CONCILIACIONES";
export const DELETE_CONCILIACIONES = "DELETE_CONCILIACIONES";
export const CLEAR_ALL_CONCILIACIONES = "CLEAR_ALL_CONCILIACIONES";

export const GET_CONCILIACIONES_DETAILS = "GET_CONCILIACIONES_DETAILS";
export const DELETE_CONCILIACIONES_DETAILS = "DELETE_CONCILIACIONES_DETAILS";
export const IMPORT_CONCILIACIONES = "IMPORT_CONCILIACIONES";

export const SET_CONCILIACIONES_USERS = "SET_CONCILIACIONES_USERS";
export const GET_CONCILIACIONES_USERS = "GET_CONCILIACIONES_USERS";

const dataColl = collection(db, "Data");
const conciliacionesDoc = doc(dataColl, "Conciliaciones");
const headColl = collection(conciliacionesDoc, "Head");
const detailsColl = collection(conciliacionesDoc, "Details");

export function setConciliaciones(
  conciliaciones: Conciliaciones
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      // Firesoter collections
      const headDoc = doc(headColl);
      const detailsDoc = doc(detailsColl, headDoc.id);

      // Check if the idSiproj of this "conciliacion" already exist
      const snapIdcheck = await getDoc(doc(headColl, conciliaciones.id));
      if (snapIdcheck.exists()) throw new Error("id already exist");

      // Data to save
      let head: ConciliacionesHeads = {
        id: conciliaciones.id,
        fechaIngresoSolicitud: conciliaciones.fechaIngresoSolicitud,
        radicadoSIPA: conciliaciones.radicadoSIPA,
      };
      let details: Conciliaciones = conciliaciones;

      // Add data to save
      batch.set(headDoc, head);
      batch.set(detailsDoc, details);

      // Post data
      await batch.commit();

      dispatch({
        type: SET_CONCILIACIONES,
        payload: { id: headDoc.id, ...head },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getConciliacionesHeaders(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    let conciliaciones: any = [];
    let snapshot;

    if (user.rol === UserRol.Admin) {
      snapshot = await getDocs(headColl);
    } else if (user.rol === UserRol.User) {
      snapshot = await getDocs(
        query(headColl, where("abogado", "==", user.name))
      );
    }

    if (snapshot) {
      snapshot.forEach((doc) => {
        conciliaciones.push({
          id: doc.id,
          ...doc.data(),
          fechaIngresoSolicitud: getDateOrNull(
            doc.data().fechaIngresoSolicitud
          ),
        });
      });
    }

    try {
      dispatch({
        type: GET_CONCILIACIONES,
        payload: conciliaciones,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getConciliaciones(
  id: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(doc(detailsColl, id));
      let details: any = snapshot.data();

      details = {
        ...details,
        id: id,
        fechaIngresoSolicitud: getDateOrNull(details.fecha),
        fechaComite: getDateOrNull(details.fechaComite),
        fechaCitacionAudiencia: getDateOrNull(details.fechaCitacionAudiencia),
      };

      dispatch({
        type: GET_CONCILIACIONES_DETAILS,
        payload: details,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteConciliaciones() {
  return {
    type: DELETE_CONCILIACIONES_DETAILS,
  };
}

export function updateConciliaciones(
  details: Conciliaciones
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    const batch = writeBatch(db);

    const head: ConciliacionesHeads = {
      id: details.id,
      fechaIngresoSolicitud: details.fechaIngresoSolicitud,
      radicadoSIPA: details.radicadoSIPA,
    };

    batch.update(doc(headColl, details.id), { ...head });
    batch.update(doc(detailsColl, details.id), { ...details });

    batch.commit();

    try {
      dispatch({
        type: UPDATE_CONCILIACIONES,
        payload: { id: details.id, ...head },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteConciliacion(
  id: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      batch.delete(doc(headColl, id));
      batch.delete(doc(detailsColl, id));

      await batch.commit();

      dispatch({
        type: DELETE_CONCILIACIONES,
        payload: id,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function importConciliaciones(
  details: Conciliaciones[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      let batch = writeBatch(db);
      let row = 0;
      let length = 0;
      let heads: ConciliacionesHeads[] = [];

      try {
        for (const detail of details) {
          row++;
          length++;

          // Firestore docs
          const headDoc = doc(headColl);
          const detailsDoc = doc(detailsColl, headDoc.id);

          // Data to post
          let head: ConciliacionesHeads = {
            id: detail.id,
            fechaIngresoSolicitud: detail.fechaIngresoSolicitud,
            radicadoSIPA: detail.radicadoSIPA,
          };
          heads.push(head);

          batch.set(headDoc, head);
          batch.set(detailsDoc, detail);

          if (length >= 240) {
            await batch.commit();
            batch = writeBatch(db);
            length = 0;
          }
        }
      } catch (error) {
        console.log(error);
        throw new Error(`Hubo un error en la fila ${row} `);
      }

      await batch.commit();

      dispatch({
        type: IMPORT_CONCILIACIONES,
        payload: heads,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function clearAllConciliaciones(): ThunkAction<
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
        type: CLEAR_ALL_CONCILIACIONES,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getUserDisabled(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  any
> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const snapshot = await getDoc(conciliacionesDoc);
      let doc = snapshot.data();
      let users = doc?.users;

      // If users are not exist, create them
      if (!doc) {
        await setDoc(conciliacionesDoc, { users: [] });
        users = [];
      } else if (!users) {
        await updateDoc(conciliacionesDoc, { users: [] });
        users = [];
      } else {
        users = doc.users;
      }

      dispatch({
        type: GET_CONCILIACIONES_USERS,
        payload: users,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
