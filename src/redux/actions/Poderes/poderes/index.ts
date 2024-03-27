import {
  PoderesDetails,
  PoderesHeads,
} from "../../../../interfaces/Poderes/data";
import { UserRol, Users } from "../../../../interfaces/users";
import { UserSelected } from "../../../../interfaces/Tutelas/data";
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
import getDateOrNull from "../../../../functions/getDateOrNull";

export const SET_PODERES = "SET_PODERES";
export const GET_PODERES = "GET_PODERES";
export const UPDATE_PODERES = "UPDATE_PODERES";
export const DELETE_PODERES = "DELETE_PODERES";
export const CLEAR_ALL_PODERES = "CLEAR_ALL_PODERES";

export const GET_PODERES_DETAILS = "GET_PODERES_DETAILS";
export const DELETE_PODER_DETAILS = "DELETE_PODER_DETAILS";
export const IMPORT_PODERES = "IMPORT_PODERES";

export const SET_PODERES_USERS = "SET_PODERES_USERS";
export const GET_PODERES_USERS = "GET_PODERES_USERS";

const dataColl = collection(db, "Data");
const poderesDoc = doc(dataColl, "Poderes");
const headColl = collection(poderesDoc, "Head");
const detailsColl = collection(poderesDoc, "Details");

export function setPoderes(
  poder: PoderesDetails,
  users: UserSelected[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      // Firesoter collections
      const headDoc = doc(headColl);
      const detailsDoc = doc(detailsColl, headDoc.id);

      // Check if the idSiproj of this "poder" already exist
      const snapIdcheck = await getDoc(doc(headColl, poder.id.toString()));
      if (snapIdcheck.exists()) throw new Error("id already exist");

      // Data to save
      let head: PoderesHeads = {
        id: poder.id,
        radicadoSipa: poder.radicadoSipa,
        abogado: poder.abogado,
        concepto: poder.concepto,
        accionante: poder.accionante,
      };
      let details: PoderesDetails = poder;

      // Add data to save
      batch.set(headDoc, head);
      batch.set(detailsDoc, details);
      batch.update(poderesDoc, {
        users: users.map((selected: UserSelected) =>
          selected.user === head.abogado
            ? { ...selected, available: false }
            : selected
        ),
      });

      // Post data
      await batch.commit();

      dispatch({
        type: SET_PODERES,
        payload: { ...head, id: headDoc.id },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getPoderes(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    let poderes: any = [];
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
        poderes.push({
          id: doc.id,
          ...doc.data(),
          fechaNotificacion: getDateOrNull(doc.data().fechaNotificacion),
        });
      });
    }

    try {
      dispatch({
        type: GET_PODERES,
        payload: poderes,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getPoderDetails(
  id: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(doc(detailsColl, id));
      let details: any = snapshot.data();

      details = {
        ...details,
        id: id,
        fecha: getDateOrNull(details.fecha),
        fechaVencimiento: getDateOrNull(details.fechaVencimiento),
        fechaRespuesta: getDateOrNull(details.fechaRespuesta),
        fechaFallo1raInst: getDateOrNull(details.fechaFallo1raInst),
        fechaCumplimiento1raInst: getDateOrNull(
          details.fechaCumplimiento1raInst
        ),
        fechaImpugnacion: getDateOrNull(details.fechaImpugnacion),
        fechaFallo2daInst: getDateOrNull(details.fechaFallo2daInst),
        fechaCumplimiento2daInst: getDateOrNull(
          details.fechaCumplimiento2daInst
        ),
      };

      dispatch({
        type: GET_PODERES_DETAILS,
        payload: details,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deletePoderDetails() {
  return {
    type: DELETE_PODER_DETAILS,
  };
}

export function updatePoderes(
  details: PoderesDetails
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    const batch = writeBatch(db);

    let head: PoderesHeads = {
      id: details.id,
      radicadoSipa: details.radicadoSipa,
      abogado: details.abogado,
      concepto: details.concepto,
      accionante: details.accionante,
    };

    batch.update(doc(headColl, details.id), { ...head });
    batch.update(doc(detailsColl, details.id), { ...details });

    batch.commit();

    try {
      dispatch({
        type: UPDATE_PODERES,
        payload: { ...head, id: details.id },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deletePoder(
  id: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      batch.delete(doc(headColl, id));
      batch.delete(doc(detailsColl, id));

      await batch.commit();

      dispatch({
        type: DELETE_PODERES,
        payload: id,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function importPoderes(
  details: PoderesDetails[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      let batch = writeBatch(db);
      let row = 0;
      let length = 0;
      let heads: PoderesHeads[] = [];

      try {
        for (const detail of details) {
          row++;
          length++;

          // Firestore docs
          const headDoc = doc(headColl);
          const detailsDoc = doc(detailsColl, headDoc.id);

          // Data to post
          let head: PoderesHeads = {
            id: detail.id,
            radicadoSipa: detail.radicadoSipa,
            abogado: detail.abogado,
            concepto: detail.concepto,
            accionante: detail.accionante,
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
        type: IMPORT_PODERES,
        payload: heads,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function clearAllPoderes(): ThunkAction<
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
        type: CLEAR_ALL_PODERES,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateUserDisabled(
  users: UserSelected[]
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      updateDoc(poderesDoc, {
        users: users,
      });

      dispatch({
        type: SET_PODERES_USERS,
        payload: users,
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
      const snapshot = await getDoc(poderesDoc);
      let doc = snapshot.data();
      let users = doc?.users;

      // If users are not exist, create them
      if (!doc) {
        await setDoc(poderesDoc, { users: [] });
        users = [];
      } else if (!users) {
        await updateDoc(poderesDoc, { users: [] });
        users = [];
      } else {
        users = doc.users;
      }

      dispatch({
        type: GET_PODERES_USERS,
        payload: users,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
