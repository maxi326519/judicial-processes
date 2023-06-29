import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import { initProcessLists } from "../../../../interfaces/Processes/lists";
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

export const SET_PROCESS_LIST_ITEM = "SET_PROCESS_LIST_ITEM";
export const GET_PROCESS_LISTS = "GET_PROCESS_LISTS";
export const DELETE_PROCESS_LIST_ITEM = "DELETE_PROCESS_LIST_ITEM";

const dataColl = collection(db, "Data");
const processesDoc = doc(dataColl, "Processes");

export function setItem(
  listName: string,
  newValues: string[]
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const batch = writeBatch(db);

      newValues.forEach((value: string) => {
        batch.update(processesDoc, {
          [`lists.${listName}`]: arrayUnion(value),
        });
      });

      await batch.commit();

      dispatch({
        type: SET_PROCESS_LIST_ITEM,
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
      const snapshot = await getDoc(processesDoc);
      let doc = snapshot.data();
      let lists = doc?.lists;

      console.log(snapshot.exists());

      // If lists don't existe, create it
      if (!snapshot.exists()) {
        lists = { ...initProcessLists };
        await setDoc(processesDoc, { lists });
      } else if (!lists) {
        lists = { ...initProcessLists };
        await updateDoc(processesDoc, { lists });
      } else {
        lists = doc!.lists;
      }

      dispatch({
        type: GET_PROCESS_LISTS,
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
        batch.update(processesDoc, {
          [listName]: arrayRemove(value),
        });
      });

      await batch.commit();

      dispatch({
        type: DELETE_PROCESS_LIST_ITEM,
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
