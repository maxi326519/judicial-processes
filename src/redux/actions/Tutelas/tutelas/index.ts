import { AnyAction } from "redux";
import { UserRol, Users } from "../../../../interfaces/users";
import { RootState } from "../../../../interfaces/RootState";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "react";
import { db } from "../../../../firebase/config";
import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  TutelaDetails,
  TutelaHeads,
} from "../../../../interfaces/Tutelas/data";
import getDateOrNull from "../../../../functions/getDateOrNull";

export const SET_TUTELAS = "SET_TUTELAS";
export const GET_TUTELAS = "GET_TUTELAS";
export const UPDATE_TUTELAS = "UPDATE_TUTELAS";
export const DELETE_TUTELAS = "DELETE_TUTELAS";
export const CLEAR_ALL_TUTELAS = "CLEAR_ALL_TUTELAS";

export const GET_TUTELAS_DETAILS = "GET_TUTELAS_DETAILS";
export const DELETE_TUTELA_DETAILS = "DELETE_TUTELA_DETAILS";
export const IMPORT_TUTELAS = "IMPORT_TUTELAS";

const dataColl = collection(db, "Data");
const tutelasDoc = doc(dataColl, "Tutelas");
const headColl = collection(tutelasDoc, "Head");
const detailsColl = collection(tutelasDoc, "Details");

export function setTutelas(
  tutelas: TutelaDetails
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      // Firesoter collections
      const headDoc = doc(headColl);
      const detailsDoc = doc(detailsColl, headDoc.id);

      console.log(1);

      // Check if the idSiproj of this "tutela" already exist
      const snapIdcheck = await getDoc(
        doc(headColl, tutelas.idSiproj.toString())
      );
      if (snapIdcheck.exists()) throw new Error("id already exist");

      console.log(3);

      // Data to save
      let head: TutelaHeads = {
        idSiproj: tutelas.idSiproj,
        nroTutela: tutelas.nroTutela,
        abogado: tutelas.abogado,
        demandanteId: tutelas.demandanteId,
        demandante: tutelas.demandante,
      };
      let details: TutelaDetails = tutelas;

      console.log(4);

      // Add data to save
      batch.set(headDoc, head);
      batch.set(detailsDoc, details);

      // Post data
      await batch.commit();

      dispatch({
        type: SET_TUTELAS,
        payload: { id: headDoc.id, ...head },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getTutelas(
  user: Users
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    let tutelas: any = [];
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
        tutelas.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }

    try {
      dispatch({
        type: GET_TUTELAS,
        payload: tutelas,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getTutelaDetails(
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
        type: GET_TUTELAS_DETAILS,
        payload: details,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteTutelaDetails() {
  return {
    type: DELETE_TUTELA_DETAILS,
  };
}

export function updateTutelas(
  details: TutelaDetails
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    const batch = writeBatch(db);

    const head: TutelaHeads = {
      idSiproj: details.idSiproj,
      nroTutela: details.nroTutela,
      abogado: details.abogado,
      demandanteId: details.demandanteId,
      demandante: details.demandante,
    };

    batch.update(doc(headColl, details.id), { ...head });
    batch.update(doc(detailsColl, details.id), { ...details });

    batch.commit();

    try {
      dispatch({
        type: UPDATE_TUTELAS,
        payload: { id: details.id, ...head },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteTutela(
  id: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      batch.delete(doc(headColl, id));
      batch.delete(doc(detailsColl, id));

      await batch.commit();

      dispatch({
        type: DELETE_TUTELAS,
        payload: id,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function importTutelas(
  details: TutelaDetails[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      let batch = writeBatch(db);
      let row = 0;
      let length = 0;
      let heads: TutelaHeads[] = [];

      try {
        for (const detail of details) {
          row++;
          length++;

          // Firestore docs
          const headDoc = doc(headColl);
          const detailsDoc = doc(detailsColl, headDoc.id);

          // Data to post
          let head: TutelaHeads = {
            idSiproj: detail.idSiproj,
            nroTutela: detail.nroTutela,
            abogado: detail.abogado,
            demandanteId: detail.demandanteId,
            demandante: detail.demandante,
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
        type: IMPORT_TUTELAS,
        payload: heads,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function clearAllTutelas(): ThunkAction<
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
        type: CLEAR_ALL_TUTELAS,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
