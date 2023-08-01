import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../interfaces/RootState";
import { initRequirementsLists } from "../../../../interfaces/Requirements/lists";
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

export const GET_REQUIREMENTS_LISTS = "GET_REQUIREMENTS_LISTS";
export const SET_REQUIREMENTS_ITEM = "SET_REQUIREMENTS_ITEM";
export const DELETE_REQUIREMENTS_ITEM = "DELETE_REQUIREMENTS_ITEM";

const dataColl = collection(db, "Data");
const requirementsDoc = doc(dataColl, "Requirements");

export function setItem(
  listName: string,
  newValues: string[]
): ThunkAction<Promise<void>, RootState, null, any> {
  return async (dispatch: Dispatch<any>) => {
    try {
      const batch = writeBatch(db);

      newValues.forEach((value: string) => {
        batch.update(requirementsDoc, {
          [`lists.${listName}`]: arrayUnion(value),
        });
      });

      await batch.commit();

      dispatch({
        type: SET_REQUIREMENTS_ITEM,
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
      const snapshot = await getDoc(requirementsDoc);
      let doc = snapshot.data();
      let lists = doc?.lists;

      // If lists don't existe, create it
      if (!doc) {
        lists = initRequirementsLists();
        await setDoc(requirementsDoc, { lists });
        console.log("New data");
      } else if (!lists) {
        lists = initRequirementsLists();
        await updateDoc(requirementsDoc, { lists });
        console.log("Update data");
      } else {
        lists = doc.lists;
        // Sort
        for (const list in lists) {
          let element = lists[list];
          element = element.sort((a: string, b: string) => a.localeCompare(b));
        }
      }

      dispatch({
        type: GET_REQUIREMENTS_LISTS,
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
        batch.update(requirementsDoc, {
          [`lists.${listName}`]: arrayRemove(value),
        });
      });

      // Update
      await batch.commit();

      dispatch({
        type: DELETE_REQUIREMENTS_ITEM,
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
