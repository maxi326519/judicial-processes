import { initConciliacionesList } from "../../../../interfaces/Conciliaciones/list";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import { Dispatch } from "redux";
import { db } from "../../../../firebase/config";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export const GET_CONCILIACIONES_LISTS = "GET_CONCILIACIONES_LISTS";
export const SET_CONCILIACIONES_ITEM_LISTS = "SET_CONCILIACIONES_ITEM_LISTS";
export const DELETE_CONCILIACIONES_ITEM_LISTS =
  "DELETE_CONCILIACIONES_ITEM_LISTS";

const dataColl = collection(db, "Data");
const conciliacionesDoc = doc(dataColl, "Conciliaciones");

export function setItem(
  listName: string,
  newValues: string[]
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const batch = writeBatch(db);

      newValues.forEach((value) => {
        batch.update(conciliacionesDoc, {
          [`lists.${listName}`]: arrayUnion(value),
        });
      });

      await batch.commit();

      dispatch({
        type: SET_CONCILIACIONES_ITEM_LISTS,
        payload: {
          listName,
          newValues,
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getLists(): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const snapshot = await getDoc(conciliacionesDoc);
      let doc = snapshot.data();
      let lists = doc?.lists;

      // If lists don't existe, create it
      if (!doc) {
        lists = initConciliacionesList();
        await setDoc(conciliacionesDoc, { lists });
      } else if (!lists) {
        lists = initConciliacionesList();
        await updateDoc(conciliacionesDoc, { lists });
      } else {
        lists = doc.lists;
        // Sort
        for (const list in lists) {
          let element = lists[list];
          element = element.sort((a: string, b: string) => a.localeCompare(b));
        }
      }

      dispatch({
        type: GET_CONCILIACIONES_LISTS,
        payload: lists,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteItem(
  listName: string,
  values: string[]
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      // Create the batch
      const batch = writeBatch(db);

      // Set the list items to update
      values.forEach((value: string) => {
        batch.update(conciliacionesDoc, {
          [`lists.${listName}`]: arrayRemove(value),
        });
      });

      // Update
      await batch.commit();

      dispatch({
        type: DELETE_CONCILIACIONES_ITEM_LISTS,
        payload: {
          listName,
          values,
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
