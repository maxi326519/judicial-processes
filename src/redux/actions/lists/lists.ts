import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../firebase/config";

export const GET_LIST = "GET_LIST";
export const SET_ITEM = "SET_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

export function getLists(): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const listCol = collection(db, "Lists");
      const listDoc = doc(listCol, "list");
      const snapshot = await getDoc(listDoc);
      const lists = snapshot.data();

      dispatch({
        type: GET_LIST,
        payload: lists,
      });
    } catch (error) {
      console.error("Error al obtener la lista:", error);
    }
  };
}

// Acción para agregar un nuevo valor a una lista
export function setItem(
  listName: string,
  newValues: string[]
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const batch = writeBatch(db);
      const listCol = collection(db, "Lists");
      const listDoc = doc(listCol, "list");

      newValues.forEach((value: string) => {
        batch.update(listDoc, {
          [listName]: arrayUnion(value),
        });
      });

      await batch.commit();

      dispatch({
        type: SET_ITEM,
        payload: {
          listName,
          newValues,
        },
      });
    } catch (error) {
      console.error("Error al agregar el valor a la lista:", error);
    }
  };
}

// Acción para eliminar un valor de una lista
export function deleteItem(
  listName: string,
  values: string[]
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const batch = writeBatch(db);

      const listCol = collection(db, "Lists");
      const listDoc = doc(listCol, "list");

      values.forEach((value: string) => {
        batch.update(listDoc, {
          [listName]: arrayRemove(value),
        });
      });

      await batch.commit();

      dispatch({
        type: DELETE_ITEM,
        payload: {
          listName,
          values,
        },
      });
    } catch (error) {
      console.error("Error al eliminar el valor de la lista:", error);
    }
  };
}
