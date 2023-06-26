import { AnyAction } from "redux";
import { TutelaDetail, TutelaHeads } from "../../../../interfaces/Tutelas/data";
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
import getDateOrNull from "../../../../functions/getDateOrNull";

export const SET_TUTELAS = "SET_TUTELAS";
export const GET_TUTELAS = "GET_TUTELAS";
export const UPDATE_TUTELAS = "UPDATE_TUTELAS";
export const DELETE_TUTELAS = "DELETE_TUTELAS";

export const GET_TUTELAS_DETAILS = "GET_TUTELAS_DETAILS";
export const IMPORT_TUTELAS = "IMPORT_TUTELAS";

const dataColl = collection(db, "Data");
const tutelasDoc = doc(dataColl, "Tutelas");
const headColl = collection(tutelasDoc, "Head");
const detailsColl = collection(tutelasDoc, "Details");

export function setTutelas(
  tutelas: TutelaDetail
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      const headDoc = doc(headColl, tutelas.idSiproj.toString());
      const detailsDoc = doc(detailsColl, tutelas.idSiproj.toString());

      const data = await getDoc(headDoc);
      if (data.exists()) throw new Error(`Ya existe el id ${tutelas.idSiproj}`);

      let head: TutelaHeads = {
        idSiproj: tutelas.idSiproj,
        nroTutela: tutelas.nroTutela,
        abogado: tutelas.abogado,
        demandanteId: tutelas.demandanteId,
        demandante: tutelas.demandante,
      };
      let details: TutelaDetail = tutelas;

      batch.set(headDoc, head);
      batch.set(detailsDoc, details);

      await batch.commit();

      dispatch({
        type: SET_TUTELAS,
        payload: head,
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
      snapshot.forEach((doc: any) => {
        tutelas.push(doc.data());
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

export function getDetails(
  idSiproj: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(doc(detailsColl, idSiproj));
      let details: any = snapshot.data();

      details = {
        ...details,
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

export function updateTutelas(
  details: TutelaDetail
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

    batch.update(doc(headColl, details.idSiproj.toString()), { ...head });
    batch.update(doc(detailsColl, details.idSiproj.toString()), { ...details });

    batch.commit();

    try {
      dispatch({
        type: UPDATE_TUTELAS,
        payload: head,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteTutelas(
  tutelasId: number
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);

      batch.delete(doc(headColl, tutelasId.toString()));
      batch.delete(doc(detailsColl, tutelasId.toString()));

      await batch.commit();

      dispatch({
        type: DELETE_TUTELAS,
        payload: tutelasId,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function importTutelas(
  details: TutelaDetail[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const batch = writeBatch(db);
      let row = 0;
      let heads: TutelaHeads[] = [];

      try {
        details.forEach((details: TutelaDetail) => {
          row++;

          let head: TutelaHeads = {
            idSiproj: details.idSiproj,
            nroTutela: details.nroTutela,
            abogado: details.abogado,
            demandanteId: details.demandanteId,
            demandante: details.demandante,
          };
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
        type: IMPORT_TUTELAS,
        payload: heads,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
