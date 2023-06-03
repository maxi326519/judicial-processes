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
} from "firebase/firestore";
import { db } from "../../../firebase";

const GET_LIST = "GET_LIST";
const SET_ITEM = "SET_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const DELETE_ITEM = "DELETE_ITEM";

export function getList(): ThunkAction<Promise<void>, RootState, null, any> {
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
  newValue: any
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const listCol = collection(db, "List");
      const listDoc = doc(listCol, "list");

      await updateDoc(listDoc, {
        [listName]: arrayUnion(newValue),
      });

      dispatch({
        type: SET_ITEM,
        payload: {
          listName,
          newValue,
        },
      });
    } catch (error) {
      console.error("Error al agregar el valor a la lista:", error);
    }
  };
}

// Acción para actualizar un valor en una lista
export function updateItem(
  listName: string,
  newValue: any,
  index: number
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const listCol = collection(db, "List");
      const listDoc = doc(listCol, "list");

      await updateDoc(listDoc, {
        [`${listName}.${index}`]: newValue,
      });

      dispatch({
        type: UPDATE_ITEM,
        payload: {
          listName,
          newValue,
          index,
        },
      });
    } catch (error) {
      console.error("Error al actualizar el valor en la lista:", error);
    }
  };
}

// Acción para eliminar un valor de una lista
export function deleteItem(
  listName: string,
  index: number
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const listCol = collection(db, "List");
      const listDoc = doc(listCol, "list");

      await updateDoc(listDoc, {
        [listName]: arrayRemove(index),
      });

      dispatch({
        type: DELETE_ITEM,
        payload: {
          listName,
          index,
        },
      });
    } catch (error) {
      console.error("Error al eliminar el valor de la lista:", error);
    }
  };
}
