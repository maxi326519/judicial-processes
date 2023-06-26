import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import { initTutelaLists } from "../../../../interfaces/Tutelas/lists";
import { db } from "../../../../firebase/config";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export const GET_LISTS = "GET_LISTS";
export const SET_ITEM = "SET_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

const dataColl = collection(db, "Data");
const tutelasDoc = doc(dataColl, "Tutelas");

export function setItem(
  listName: string,
  newValues: string[]
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const batch = writeBatch(db);

      newValues.forEach((value: string) => {
        batch.update(tutelasDoc, {
          lists: {
            [listName]: arrayUnion(value),
          },
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
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getLists(): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const snapshot = await getDoc(tutelasDoc);
      let lists = snapshot.data()?.lists;

      // If lists don't existe, create it
      if (!lists) {
        lists = { ...initTutelaLists };
        await updateDoc(tutelasDoc, { lists });
      }

      dispatch({
        type: GET_LISTS,
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
      const batch = writeBatch(db);

      values.forEach((value: string) => {
        batch.update(tutelasDoc, {
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
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
